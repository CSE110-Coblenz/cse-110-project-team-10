import { levels } from './levels.ts';
import { StageConfig } from './gameplay/Constants.ts';

// Define the custom window interface
interface StageAwareWindow extends Window {
    stageConfig?: StageConfig;
}

// Get level from URL
const urlParams = new URLSearchParams(window.location.search);
const levelId = urlParams.get('level');

// Set configuration BEFORE importing the game
if (levelId && levels[levelId]) {
    (window as unknown as StageAwareWindow).stageConfig = levels[levelId];
    console.log(`Loaded configuration for level ${levelId}`);
} else {
    console.log('No specific level loaded, using defaults or fallback');
    // Optional: Set a default level if none specified, e.g. level 1
    // (window as unknown as StageAwareWindow).stageConfig = levels['1'];
}

// Dynamically import the main game entry point
// This ensures Constants.ts is evaluated AFTER stageConfig is set
import('./index.ts').catch(err => {
    console.error('Failed to load game:', err);
});
