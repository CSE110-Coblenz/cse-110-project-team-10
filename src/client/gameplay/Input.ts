import { Game } from './Game';

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
		if (shootButton && this.angleInput && this.velocityInput && this.eqV1 && this.eqA1 && this.eqV2 && this.eqA2 && this.eqG) {
			shootButton.addEventListener('click', this.handleShootClick);

			// Add listeners to the new text boxes
			this.angleInput.addEventListener('input', this.onParamChange);
			this.velocityInput.addEventListener('input', this.onParamChange);
			
			this.updateTrajectory();
			this.updateEquationDisplay(); 
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
}
