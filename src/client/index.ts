import { Game } from './gameplay/Game.ts';
import { inputController } from './gameplay/Input.ts';

console.log("Main index.ts loaded");

// NMake sure the HTML doc is loaded before running the game
window.addEventListener('DOMContentLoaded', (event) => {
	const myGame = new Game('game-container'); 

	const myInputController = new inputController(myGame, 'shoot-button');
});
