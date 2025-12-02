import { Game } from './Game';
import { ShotParams } from './types';

export class inputController {
	private game: Game;
	private angleInput: HTMLInputElement | null;
	private velocityInput: HTMLInputElement | null;
	private eqV1: HTMLElement | null;
	private eqA1: HTMLElement | null;
	private eqV2: HTMLElement | null;
	private eqA2: HTMLElement | null;
	private eqG: HTMLElement | null;
	private readonly GRAVITY_CONST = "15";
	private shotsTakenDisplay: HTMLElement | null;
	private winScreen: HTMLElement | null;
	private shotCountSpan: HTMLElement | null;
	private finalAngleSpan: HTMLElement | null;
	private finalVelocitySpan: HTMLElement | null;
	private playAgainButton: HTMLButtonElement | null;
	private stageSelectionButton: HTMLButtonElement | null;

	constructor(game: Game, shootButtonId: string) {
		this.game = game;

		const shootButton = document.getElementById(shootButtonId);
		this.angleInput = document.getElementById('input-angle') as HTMLInputElement;
		this.velocityInput = document.getElementById('input-velocity') as HTMLInputElement;
		this.eqV1 = document.getElementById('eq-v-1');
		this.eqA1 = document.getElementById('eq-a-1');
		this.eqV2 = document.getElementById('eq-v-2');
		this.eqA2 = document.getElementById('eq-a-2');
		this.eqG = document.getElementById('eq-g');
		this.shotsTakenDisplay = document.getElementById('shots-taken-value');
		this.winScreen = document.getElementById('win-screen');
		this.shotCountSpan = document.getElementById('shot-count-span');
		this.finalAngleSpan = document.getElementById('final-angle-span');
		this.finalVelocitySpan = document.getElementById('final-velocity-span');
		this.playAgainButton = document.getElementById('play-again-button') as HTMLButtonElement;
		this.stageSelectionButton = document.getElementById('stage-selection-button') as HTMLButtonElement;

		if (shootButton && this.angleInput && this.velocityInput && this.eqV1 && this.eqA1 && this.eqV2 && this.eqA2 && this.eqG && this.shotsTakenDisplay && this.winScreen && this.shotCountSpan && this.finalAngleSpan && this.finalVelocitySpan && this.playAgainButton && this.stageSelectionButton) {
			shootButton.addEventListener('click', this.handleShootClick);

			// Add listeners to the new text boxes
			this.angleInput.addEventListener('input', this.onParamChange);
			this.velocityInput.addEventListener('input', this.onParamChange);
			this.playAgainButton.addEventListener('click', this.handlePlayAgain);
			this.stageSelectionButton.addEventListener('click', this.handleStageSelection);

			this.updateTrajectory();
			this.updateEquationDisplay();
			this.updateShotsDisplay(0);
		} else {
			console.error(`InputController: Could not find all required elements (button, inputs, or equation spans). Check your IDs.`);
		}
	}

	private handleShootClick = (): void => {
		const angle = this.angleInput!.value ? parseFloat(this.angleInput!.value) : 0;
		const velocity = this.velocityInput!.value ? parseFloat(this.velocityInput!.value) : 0;

		const shotParams = { angle, velocity };
		this.game.startShot(shotParams);
	}

	private onParamChange = (): void => {
		this.updateTrajectory();
		this.updateEquationDisplay();
	}
	private updateTrajectory = (): void => {
		if (this.angleInput && this.velocityInput) {
			const angle = this.angleInput.value ? parseFloat(this.angleInput.value) : 0;
			const velocity = this.velocityInput.value ? parseFloat(this.velocityInput.value) : 0;
			const params = { angle, velocity };
			this.game.updateTrajectoryPreview(params);
		}
	}
	private updateEquationDisplay = (): void => {
		if (this.angleInput && this.velocityInput) {

			const angle = this.angleInput.value || 'θ';
			const velocity = this.velocityInput.value || 'v';

			// Update all the text contents
			this.eqV1!.textContent = velocity;
			this.eqV2!.textContent = velocity;
			this.eqA1!.textContent = angle + "°";
			this.eqA2!.textContent = angle + "°";
			this.eqG!.textContent = this.GRAVITY_CONST;
		}
	}
	private handlePlayAgain = (): void => {
		this.game.resetGame();
	}
	private handleStageSelection = (): void => {
		window.location.href = '/home.html';
	}
	public updateShotsDisplay(shots: number): void {
		if (this.shotsTakenDisplay) {
			this.shotsTakenDisplay.textContent = shots.toString();
		}
	}
	public showWinScreen(shots: number, params: ShotParams): void {
		if (this.winScreen && this.shotCountSpan && this.finalAngleSpan && this.finalVelocitySpan) {
			this.shotCountSpan.textContent = shots.toString();
			this.finalAngleSpan.textContent = params.angle.toFixed(1);
			this.finalVelocitySpan.textContent = params.velocity.toFixed(1);

			this.winScreen.classList.remove('hidden');
		}
	}

	public hideWinScreen(): void {
		if (this.winScreen) {
			this.winScreen.classList.add('hidden');
		}
	}
}
