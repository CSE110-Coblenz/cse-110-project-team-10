import { Game } from './Game';

export class inputController {
	private game: Game; 
	private angleSlider: HTMLInputElement;
  	private angleValueSpan: HTMLElement;
  	private velocitySlider: HTMLInputElement;
 	private velocityValueSpan: HTMLElement;

	constructor(game: Game, shootButtonId: string) {
		this.game = game; 

		const shootButton = document.getElementById(shootButtonId); 
		this.angleSlider = document.getElementById('angle-slider') as HTMLInputElement;
    		this.angleValueSpan = document.getElementById('angle-value') as HTMLElement;
	    	this.velocitySlider = document.getElementById('velocity-slider') as HTMLInputElement;
	    	this.velocityValueSpan = document.getElementById('velocity-value') as HTMLInputElement;
		if (shootButton && this.angleSlider && this.velocitySlider && this.angleValueSpan && this.velocityValueSpan) {
			shootButton.addEventListener('click', () => {
				this.handleShootClick(); 
			});
			
			this.angleSlider.addEventListener('input', this.onAngleChange);
			this.velocitySlider.addEventListener('input', this.onVelocityChange);
			
			this.onAngleChange();
			this.onVelocityChange();
		} else {
			console.error('no button with ID #${shootButtonId}');
		}
	}

	private handleShootClick(): void { 
		const shotParams = { 
			angle: parseFloat(this.angleSlider.value),
			velocity: parseFloat(this.velocitySlider.value)
		};
		
		this.game.startShot(shotParams); 
	}

	private onAngleChange = (): void => {
		const value = this.angleSlider.value;
		this.angleValueSpan.textContent = `${value}°`;
		console.log("Angle changed to: ", value);
		this.game.updateTrajectoryPreview({angle: parseFloat(value), velocity: parseFloat(this.velocitySlider.value)});
	}

	private onVelocityChange = (): void => {
		const value = this.velocitySlider.value;
		this.velocityValueSpan.textContent = `${value} m/s`;
		console.log("Velocity changed to: ", value);
		this.game.updateTrajectoryPreview({angle: parseFloat(this.angleSlider.value), velocity: parseFloat(value)});
	}
}
