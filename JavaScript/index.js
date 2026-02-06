/* ================== BASIC SETUP ================== */
const screens = document.querySelectorAll(".screen");
let currentScreen = 0;

const music = document.getElementById("bgMusic");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const heartsContainer = document.querySelector(".hearts");
const roseContainer = document.querySelector(".roses");
const letterBox = document.getElementById("letter");

/* ================== AUTO OPEN ROSE DAY (FEB 7) ================== */
(function autoRoseDay() {
    const today = new Date();
    if (today.getDate() === 7 && today.getMonth() === 1) {
        screens[currentScreen].classList.remove("active");
        currentScreen = 5; // Rose Day screen index
        screens[currentScreen].classList.add("active");
    }
})();

/* ================== SCREEN NAVIGATION ================== */
function nextScreen() {
    if (currentScreen === 0) {
        music.volume = 0.4;
        music.play().catch(() => {});
    }

    screens[currentScreen].classList.remove("active");
    currentScreen++;
    screens[currentScreen].classList.add("active");

    // Start handwritten typing if this is the letter screen
    if (screens[currentScreen].classList.contains("handwritten")) {
        startTypingLetter();
    }
}

/* ================== MOVE NO BUTTON ================== */
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", moveNo);

function moveNo() {
    const x = Math.random() * 140 - 70;
    const y = Math.random() * 140 - 70;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/* ================== YES BUTTON ACTION ================== */
yesBtn.addEventListener("click", () => {
    screens[currentScreen].classList.remove("active");
    currentScreen++;
    screens[currentScreen].classList.add("active");
    createHearts();
});

/* ================== HEART ANIMATION ================== */
function createHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }
}

/* ================== HANDWRITTEN LETTER ================== */
const letterText = `Anmol ❤️
I used to think "home" was a place—a building with walls and a roof. 
But since I met you, I’ve realized that home is a feeling. 
It’s the safety I feel when I’m with you. 
It is the peace that settles over me when I see you happy.
Every single smile of yours feels like coming home after a long, hard journey.
I just wanted you to know how incredibly special you are to me. 
You are not just a part of my life; you are the best part of it. 
Thank you for being exactly who you are.
Sumit 🌹`;

let letterIndex = 0;

function startTypingLetter() {
    letterBox.innerHTML = "";
    letterIndex = 0;
    typeLetter();
}

function typeLetter() {
    if (letterIndex < letterText.length) {
        letterBox.innerHTML += letterText.charAt(letterIndex);
        letterIndex++;
        setTimeout(typeLetter, 50);
    }
}

/* ================== FUNNY NO COUNTER + YES GROWS ================== */
let noCount = 0;

const noMessages = [
    "Are you sure? 🥺",
    "Pleaseee 🥹",
    "Think again 😳",
    "Okay last chance 😭"
];

noBtn.addEventListener("click", () => {
    noBtn.innerText = noMessages[noCount % noMessages.length];
    noCount++;

    moveNo();

    // Grow Yes button
    const scale = 1 + noCount * 0.15;
    yesBtn.style.transform = `scale(${scale})`;
    yesBtn.style.animation = "pulse 0.6s infinite alternate";
});

/* ================== ROSE DAY HEAVY RAIN ================== */
function startRoseDay() {
    nextScreen();

    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createRoses();
        }
    }, 300);
}

function createRoses() {
    const roses = ["🌹", "🌸", "🥀"];

    const rose = document.createElement("div");
    rose.className = "rose";
    rose.innerHTML = roses[Math.floor(Math.random() * roses.length)];

    rose.style.left = Math.random() * 100 + "vw";
    rose.style.fontSize = (Math.random() * 20 + 20) + "px";
    rose.style.animationDuration = (Math.random() * 3 + 4) + "s";

    roseContainer.appendChild(rose);

    setTimeout(() => rose.remove(), 8000);
}
