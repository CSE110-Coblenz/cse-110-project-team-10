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

        return
    }
});
