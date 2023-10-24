const monster = {
    monster1: {
        name: "Bloater-Fat-Zombie",
        img: "img/Monsters/Bloater-Fat-Zombie.png",
        lives: 100,
        dmg: 8
    },
    monster2: {
        name: "Captain-Rick-Thief",
        img: "img/Monsters/Captain-Rick-Thief.png",
        lives: 120,
        dmg: 7
    },
    monster3: {
        name: "Carcinus",
        img: "img/Monsters/Carcinus.png",
        lives: 400,
        dmg: 13
    },
    monster4: {
        name: "The Cursed Sword",
        img: "img/Monsters/The-Cursed-Sword.png",
        lives: 180,
        dmg: 9
    },
    monster5: {
        name: "Cursed Rick Thief",
        img: "img/Monsters/Cursed-Rick-Thief.png",
        lives: 320,
        dmg: 10
    },
    monster6: {
        name: "Flaming Skull",
        img: "img/Monsters/FlamingSkull.png",
        lives: 220,
        dmg: 10
    },
    monster7: {
        name: "Reggin",
        img: "img/Monsters/Reggin.png",
        lives: 380,
        dmg: 11
    },
    monster8: {
        name: "Cabbage Golem",
        img: "img/Monsters/Cabbage-Golem.png",
        lives: 200,
        dmg: 15
    },
    monster9: {
        name: "Somalian Pirate",
        img: "img/Monsters/Somalian-Pirate.png",
        lives: 130,
        dmg: 6
    },
    monster10: {
        name: "Seaber",
        img: "img/Monsters/Seaber.png",
        lives: 130,
        dmg: 13
    },
    monster11: {
        name: "Skelly Weird Zombie",
        img: "img/Monsters/Skelly-Weird-Zombie.png",
        lives: 150,
        dmg: 8
    },
    monster12: {
        name: "Ultraviolet Slime",
        img: "img/Monsters/Ultraviolet-Slime.png",
        lives: 90,
        dmg: 5
    },
    monster13: {
        name: "The Great Kraken",
        img: "img/Monsters/The-Great-Kraken.png",
        lives: 600,
        dmg: 15
    },
    monster14: {
        name: "Sea Virus",
        img: "img/Monsters/SeaVirus.png",
        lives: 120,
        dmg: 8
    },
    monster15: {
        name: "The Tres Amigos",
        img: "img/Monsters/The-Tres-Amigos.png",
        lives: 300,
        dmg: 12
    },
}


const playerProg = document.getElementById("pBar");
const playerLivesCount = document.getElementById("pLivesCount");

const monsterProg = document.getElementById("mBar");
const monsterLivesCount = document.getElementById("mLivesCount");

const attackInput = document.getElementById("attack-input");


const monstersGrid = document.querySelector(".monster-grid");

let monsterLives  = 0;
let monsterAttack = 0;
let monsterReduced = 0;

let barrierIndicator = false;
let silenceIndicator = false;
let damageReductionIndicator = false;
let x2MattackActive = false;

for (const monsterKey in monster) {
    if (monster.hasOwnProperty(monsterKey)) {
        const monsterData = monster[monsterKey];
        
        // Create a div element for the monster
        const monsterDiv = document.createElement("div");
        monsterDiv.classList.add("monster-con");

        // Create HTML content for the monster using its data
        monsterDiv.innerHTML = `
        <img src=${monsterData.img} alt="" width="80px">
        `;

        // Add the monster div to the monstersGrid
        monstersGrid.appendChild(monsterDiv);

        // Add a click event listener to handle the user's choice
        monsterDiv.addEventListener("click", () => {
            // Update the monsterProg and other related information
            monsterProg.max = monsterData.lives;
            monsterProg.value = monsterData.lives;
            monsterLivesCount.innerText = monsterData.lives + "%";

            monsterLives = monsterData.lives;
            monsterAttack = monsterData.dmg;
            monsterReduced = monsterData.dmg;

            const monsterImg = document.getElementById("monsterImg");
            monsterImg.src = monsterData.img;

            setTimeout(function() {
                const monsterModal = document.querySelector(".monsterModal");
                monsterModal.style.display = "none";
            },500);
            // You can also update other information based on the chosen monster if needed
        });
    }
}

document.getElementById("monsters").addEventListener("click", () => {
    const monsterModal = document.querySelector(".monsterModal");
    monsterModal.style.display = "block";
});

document.getElementById("back").addEventListener("click", () => {
    const monsterModal = document.querySelector(".monsterModal");
    monsterModal.style.display = "none";
});


const damageReduction = document.getElementById("damage-reduction");
const barrier = document.getElementById("barrier");
const healthReduction = document.getElementById("health-reduction");
const heal = document.getElementById("heal");
const silence = document.getElementById("silence");
const times2MonsterDmg = document.getElementById("x2Mattack");


document.getElementById("attack-btn").addEventListener("click", () => {
       // Get the attack input value and evaluate it as a number
       const attackValue = eval(attackInput.value);

       // Damage Reduction
       if(damageReductionIndicator === true) {
            monsterAttack = Math.ceil(monsterAttack / 2);
            playerAttack();
            monsterAttack = monsterReduced;
            damageReductionIndicator = false;
            damageReduction.style.backgroundColor = "transparent";
            damageReduction.style.borderColor = "white";
       } 
       // Barrier
       else if(barrierIndicator === true) {
            const attackValue = eval(attackInput.value);

              // Check if the attackValue is a valid number
           if (!isNaN(attackValue) && attackValue >= 0) {
            // Calculate the new monster lives value after the attack
            monsterLives -= attackValue;
            // Ensure that the monster lives value doesn't go below 0
            if (monsterLives < 0) {
                monsterLives = 0;
            }
    
                // Update the monsterProg value and text
                monsterProg.value = monsterLives;
                monsterLivesCount.textContent = monsterLives + "%";
                barrier.checked = false;
            } 
            attackInput.value = "";

            barrierIndicator = false;
            barrier.style.backgroundColor = "transparent";
            barrier.style.borderColor = "white";
       }
       // Silence
       else if(silenceIndicator === true) {
        const attackValue = eval(attackInput.value);

            // Check if the attackValue is a valid number
        if (!isNaN(attackValue) && attackValue >= 0) {
            // Calculate the new monster lives value after the attack
            monsterLives -= attackValue;
            // Ensure that the monster lives value doesn't go below 0
            if (monsterLives < 0) {
                monsterLives = 0;
            }

                // Update the monsterProg value and text
                monsterProg.value = monsterLives;
                monsterLivesCount.textContent = monsterLives + "%";
                silence.checked = false;
            } 
            attackInput.value = "";
            silenceIndicator = false;
            silence.style.backgroundColor = "transparent";
            silence.style.borderColor = "white";
        }
       else {
            monsterAttack = monsterReduced;
            playerAttack();
       }


       if (x2Mattack === true) {
            monsterAttack = monsterAttack * 2;
            console.log(monsterAttack);
            playerAttack(); 
            console.log(monsterAttack);
            monsterAttack = monsterReduced;
            console.log(monsterAttack);
            x2Mattack = false;
            times2MonsterDmg.style.backgroundColor = "transparent";
            times2MonsterDmg.style.borderColor = "white";
       }

       progressBarManipulator();
});

document.getElementById("restart").addEventListener("click", () => {
    monsterLives  = 0;
    monsterAttack = 0;
    monsterProg.value = monsterLives;
    monsterLivesCount.textContent = monsterLives + "%" ;
    playerLivesCount.textContent =  100 + "%";
    playerProg.value = 100;
    damageReductionIndicator = false;
    barrierIndicator = false;
    silenceIndicator = false;
    x2MattackActive = false;
    attackInput.value = "";

    progressBarManipulator();

    document.getElementById("x2Mattack").style.backgroundColor = "transparent";
    document.getElementById("x2Mattack").style.borderColor = "white";

    damageReduction.style.backgroundColor = "transparent";
    damageReduction.style.borderColor = "white";

    barrier.style.backgroundColor = "transparent";
    barrier.style.borderColor = "white";

    silence.style.backgroundColor = "transparent";
    silence.style.borderColor = "white";
    document.getElementById("health-reduction").style.display = "block";
});

document.getElementById("heal").addEventListener("click", () => {
    playerProg.value = playerProg.value + 20;
    playerLivesCount.textContent = playerProg.value  + "%";
    // const heal = document.getElementById("heal");
    // heal.checked = false;
    progressBarManipulator();
});

damageReduction.addEventListener("click", () => {
    damageReductionIndicator = !damageReductionIndicator;

    if(damageReductionIndicator) {
        barrierIndicator = false;
        silenceIndicator = false;

        damageReduction.style.backgroundColor = "#00414A";
        damageReduction.style.borderColor = "#168595";

        barrier.style.backgroundColor = "transparent";
        barrier.style.borderColor = "white";

        silence.style.backgroundColor = "transparent";
        silence.style.borderColor = "white";
    }
    else {
        damageReduction.style.backgroundColor = "transparent";
        damageReduction.style.borderColor = "white";
    }

});

barrier.addEventListener("click", () => {
    barrierIndicator = !barrierIndicator;

    if(barrierIndicator) {
        damageReductionIndicator = false;
        silenceIndicator = false;

        barrier.style.backgroundColor = "#00414A";
        barrier.style.borderColor = "#168595";

        damageReduction.style.backgroundColor = "transparent";
        damageReduction.style.borderColor = "white";

        silence.style.backgroundColor = "transparent";
        silence.style.borderColor = "white";
    } 
    else {
        barrier.style.backgroundColor = "transparent";
        barrier.style.borderColor = "white";
    }

});

silence.addEventListener("click", () => {
    silenceIndicator = !silenceIndicator;


    if(silenceIndicator) {
        damageReductionIndicator = false;
        barrierIndicator = false;
        silence.style.backgroundColor = "#00414A";
        silence.style.borderColor = "#168595";

        damageReduction.style.backgroundColor = "transparent";
        damageReduction.style.borderColor = "white";

        barrier.style.backgroundColor = "transparent";
        barrier.style.borderColor = "white";
    }
    else {
        silence.style.backgroundColor = "transparent";
        silence.style.borderColor = "white";
    }





});


document.getElementById("health-reduction").addEventListener("click", function() {
    monsterLives = Math.round(monsterLives / 2);
    
    monsterProg.value = monsterLives;
    monsterLivesCount.textContent = monsterLives + "%";

    document.getElementById("health-reduction").style.display = "none";

});     


document.getElementById("x2Mattack").addEventListener("click", () => {
    x2MattackActive = !x2MattackActive; // Toggle the variable
    if (x2MattackActive) {
        document.getElementById("x2Mattack").style.backgroundColor = "#ADB01E";
        document.getElementById("x2Mattack").style.borderColor = "#9B7104";
    } else {
        document.getElementById("x2Mattack").style.backgroundColor = "transparent";
        document.getElementById("x2Mattack").style.borderColor = "white";
    }
});

function playerAttack() {
    // Get the attack input value and evaluate it as a number
    const attackValue = eval(attackInput.value);
    document.getElementById("health-reduction").style.display = "none";

    // Check if the "x2Mattack" effect is active and double the monster's damage
    if (x2MattackActive) {
        monsterAttack *= 2;
    }

    // Check if the attackValue is a valid number
    if (!isNaN(attackValue) && attackValue >= 0) {
        // Calculate the new monster lives value after the attack
        monsterLives -= attackValue;
        playerProg.value -= monsterAttack;

        // Ensure that the monster lives value doesn't go below 0
        if (monsterLives < 0 || playerLivesCount.value < 0) {
            monsterLives = 0;
            playerLivesCount.value = 0;
        }

        // Update the monsterProg value and text
        monsterProg.value = monsterLives;
        monsterLivesCount.textContent = monsterLives + "%";
        playerLivesCount.textContent = playerProg.value + "%";
    } else {
        // Handle invalid input (e.g., not a number or negative number)
        const invalid = document.querySelector(".invalid-msg");
        invalid.style.display = "block";
    }

    // Clear the attack input field
    attackInput.value = "";

    // Reset the "x2Mattack" effect after one use
    if (x2MattackActive) {
        x2MattackActive = false;
        document.getElementById("x2Mattack").style.backgroundColor = "transparent";
        document.getElementById("x2Mattack").style.borderColor = "white";
    }
}

document.getElementById("okay").addEventListener("click", function() {
    const invalid = document.querySelector(".invalid-msg");
    invalid.style.display = "none";
});


document.addEventListener("DOMContentLoaded", function() {
    const intro = document.getElementById("introScreen");
    
    setTimeout(function() {
        intro.style.opacity = 0; 
        setTimeout(function() {
            intro.style.display = "none";
        },1000);
    },5000);
});

let counter = 0;
document.getElementById("playerImg").addEventListener("click", function() {
    const pImg = ["img/Job Roles/Doctor.png", "img/Job Roles/Soldier.png", "img/Job Roles/Carpenter.png"];
    

    if(counter <= 2){
        document.getElementById("playerImg").src = pImg[counter];
        counter++;
    } else {
        counter = 0;
    }

    console.log(counter);
});


function progressBarManipulator() {
    if(monsterProg.value <= 30){
        monsterProg.classList.remove("green");
        monsterProg.classList.add("red");
    } 
    else {
        monsterProg.classList.remove("red");
        monsterProg.classList.add("green");
    }

    if(playerProg.value <= 30) {
        playerProg.classList.remove("green");
        playerProg.classList.add("red");

        document.getElementById("kimino").play();
    } else {
        playerProg.classList.remove("red");
        playerProg.classList.add("green");
        document.getElementById("kimino").pause();
        document.getElementById("kimino").currentTime = 0;
    }
}

