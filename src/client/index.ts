import { Game } from './gameplay/Game.ts';
import { inputController } from './gameplay/Input.ts';

console.log('Main index.ts loaded');

// Make sure the HTML doc is loaded before running the game
window.addEventListener('DOMContentLoaded', () => {
	const game = new Game('game-container');
	new inputController(game, 'shoot-button');

	const startScreen = document.getElementById('start-screen');
	const guestButton = document.getElementById('guest-play-button');

	if (!guestButton) {
		console.warn('Missing guest sign-in button; start screen will remain visible.');
		return;
	}

	guestButton.addEventListener('click', () => {
		if (startScreen) {
			startScreen.classList.add('hidden');
		}
	});
});
