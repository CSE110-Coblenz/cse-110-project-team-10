import { Game } from './gameplay/Game.ts';
import { inputController } from './gameplay/Input.ts';
import { setupGuestPlayButton } from './startScreen.ts';

console.log('Main index.ts loaded');

// Make sure the HTML doc is loaded before running the game
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("start-screen")) {
        const startScreen = document.getElementById('start-screen');
        const guestButton = document.getElementById('guest-play-button');

        setupGuestPlayButton(startScreen, guestButton);
        return;
    }

    if(document.getElementById("game-container")){
	    const game = new Game('game-container');

        const myInputController = new inputController(game, 'shoot-button');

        game.setInputController(myInputController);

        return
    }   
    
    /*
    const startScreen = document.getElementById('start-screen');
    const guestButton = document.getElementById('guest-play-button');
    const isGuestButtonAvailable = setupGuestPlayButton(startScreen, guestButton);

    if (!isGuestButtonAvailable) {
        console.warn('Missing guest sign-in button; start screen will remain visible.');
        return;
    }
    */
});
