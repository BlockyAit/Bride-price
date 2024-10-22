document.getElementById("submit").addEventListener("click", calculatePrice);

function calculatePrice() {
    let price = 100;

    const educationCoefficients = {
        "bachelor": 1.5,
        "college": 1.2,
        "high_school": 1.05,
        "middle_school": 0.9
    };

    const netWorthCoefficients = {
        "upper_class": 2,
        "middle_class": 1.5,
        "lower_class": 1.2
    };

    const casteAdjustments = {
        "brahmin": 100,
        "kshatriya": 50,
        "vaishya": 20,
        "shudra": 10,
        "untouchable": -50
    };

    const skillAdjustments = {
        "instrument": 10,
        "cook": 20,
        "easygoing": 15,
        "sings": 10
    };

    const ageCoefficients = {
        "18-23": 1.5,
        "24-27": 1.2,
        "28+": 0.95
    };

    const repCoefficients = {
        "gossips_parents": 0.85,
        "gossips_character": 0.9,
        "general_gossips": -20
    };

    const educationLevel = document.getElementById("education").value;
    const netWorth = document.getElementById("networth").value;
    const caste = document.querySelector('input[name="caste"]:checked');
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    const ageGroup = document.querySelector('input[name="age"]:checked');
    const reputation = document.querySelectorAll('input[name="reputation"]:checked');

    if (educationLevel !== "blank") {
        price *= educationCoefficients[educationLevel];
    }

    if (netWorth !== "blank") {
        price *= netWorthCoefficients[netWorth];
    }


    if (caste && casteAdjustments[caste.value]) {
        price += casteAdjustments[caste.value];
    }

    skills.forEach(skill => {
        if (skillAdjustments[skill.value]) {
            price += skillAdjustments[skill.value];
        }
    });

    if (ageGroup && ageCoefficients[ageGroup.value]) {
        price *= ageCoefficients[ageGroup.value];
    }

    let reputationCoefficient = 1;
    reputation.forEach(rep => {
        if (rep.value === "general_gossips") {
            price += repCoefficients[rep.value];
        } else {
            reputationCoefficient *= repCoefficients[rep.value];
        }
    });
    price *= reputationCoefficient;

    const resultElement = document.getElementById("result");
    resultElement.innerText = `The calculated dowry price is $${price.toFixed(2)}`;

    resultElement.style.color = "green"; 
    resultElement.style.fontWeight = "bold"; 
    resultElement.style.fontSize = "1.5em"; 

    document.querySelector(".container").style.backgroundColor = "#f0f8ff";
}
