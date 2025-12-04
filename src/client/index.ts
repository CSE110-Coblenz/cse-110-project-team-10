import { Game } from './gameplay/Game.ts';
import { inputController } from './gameplay/Input.ts';
import { setupGuestPlayButton } from './startScreen.ts';
import { getOrCreateUser } from './userdata.ts';

console.log('Main index.ts loaded');

// Make sure the HTML doc is loaded before running the game
window.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const guestButton = document.getElementById('guest-play-button');

    if(startScreen && guestButton){
        setupGuestPlayButton(startScreen, guestButton);
        const input = document.getElementById("player-name") as HTMLInputElement;

        guestButton.addEventListener("click", () => {
            const name = input.value.trim();
            const finalName = name || "Guest";

            getOrCreateUser(finalName);

            localStorage.setItem("currentUser", finalName);

            window.location.href = "home.html";
        });
        return;
    }

    if(document.getElementById("game-container")){
	    const game = new Game('game-container');

        const myInputController = new inputController(game, 'shoot-button');

        game.setInputController(myInputController);

        import("./userdata.ts").then(({ loadUserDB }) => {

            const currentName = localStorage.getItem("currentUser");
            if (!currentName) {
                console.error("No currentUser in localStorage! Redirecting to signin...");
                window.location.href = "signin.html";
                return;
            }

            const db = loadUserDB();
            const user = db[currentName];
            if (!user) {
                console.error("User not found in DB. Redirecting...");
                window.location.href = "signin.html";
                return;
            }

            const power = user.stats.power;       // 1〜5
            const technique = user.stats.technique; // 1〜3

            // Getting UI input
            const velocityInput = document.getElementById("input-velocity") as HTMLInputElement;
            const angleInput = document.getElementById("input-angle") as HTMLInputElement;

            // Prevent user from typing numbers in
            angleInput.addEventListener("keydown", e => e.preventDefault());
            velocityInput.addEventListener("keydown", e => e.preventDefault());

            // Power limit
            const powerBonus = [0, 2, 5, 8, 13, 18]; 
            const maxVelocity = 12 + powerBonus[power];
            velocityInput.max = String(maxVelocity);

            // Technique limit
            const angleBase = 60;
            const angleRange = technique * 5;  
            const minAngle = angleBase - angleRange; // 60 - (technique * 5)
            const maxAngle = angleBase + angleRange; // 60 + (technique * 5)

            angleInput.min = String(minAngle);
            angleInput.max = String(maxAngle);

            angleInput.value = String(angleBase);
        });

        return
    }
});
