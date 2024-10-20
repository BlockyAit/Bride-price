document.getElementById("submit").addEventListener("click", calculatePrice);

function calculatePrice() {
    let price = 100;

    const educationLevel = document.getElementById("education").value;
    const educationCoefficients = {
        "bachelor": 1.5,
        "college": 1.2,
        "high_school": 1.05,
        "middle_school": 0.9
    };
    if (educationLevel !== "blank") {
        price *= educationCoefficients[educationLevel];
    }

    const netWorth = document.getElementById("networth").value;
    const netWorthCoefficients = {
        "upper_class": 2,
        "middle_class": 1.5,
        "lower_class": 1.2
    };
    if (netWorth !== "blank") {
        price *= netWorthCoefficients[netWorth];
    }

    const caste = document.querySelector('input[name="caste"]:checked');
    if (caste) {
        const casteAdjustments = {
            "brahmin": 100,
            "kshatriya": 50,
            "vaishya": 20,
            "shudra": 10,
            "untouchable": -50
        };
        price += casteAdjustments[caste.value];
    }

    const skills = document.querySelectorAll('input[name="skills"]:checked');
    skills.forEach(skill => {
        const skillAdjustments = {
            "instrument": 10,
            "cook": 20,
            "easygoing": 15,
            "sings": 10
        };
        price += skillAdjustments[skill.value];
    });

    const ageGroup = document.querySelector('input[name="age"]:checked');
    if (ageGroup) {
        const ageCoefficients = {
            "18-23": 1.5,
            "24-27": 1.2,
            "28+": 0.95
        };
        price *= ageCoefficients[ageGroup.value];
    }

    const reputation = document.querySelectorAll('input[name="reputation"]:checked');
    let reputationCoefficient = 1;
    reputation.forEach(rep => {
        const repCoefficients = {
            "gossips_parents": 0.85,
            "gossips_character": 0.9,
            "general_gossips": -20
        };
        if (rep.value === "general_gossips") {
            price += repCoefficients[rep.value];
        } else {
            reputationCoefficient *= repCoefficients[rep.value];
        }
    });
    price *= reputationCoefficient;

    document.getElementById("result").innerText = `The calculated price is $${price.toFixed(2)}`;
    document.getElementById("result").style.color = "green";
    document.getElementById("result").style.fontWeight = "bold";
}
