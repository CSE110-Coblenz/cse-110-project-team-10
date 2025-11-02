import { Game } from './gameplay/Game.ts';

console.log("Main index.ts loaded");

// NMake sure the HTML doc is loaded before running the game
window.addEventListener('DOMContentLoaded', (event) => {
	const myGame = new Game('game-container'); 

	myGame.startShot({angle: 60, velocity: 20});

});
