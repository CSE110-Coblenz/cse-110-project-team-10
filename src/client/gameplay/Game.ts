import { ShotParams, Position } from './types.ts';
import { calculatePositionAtTime } from './Physics.ts'; 
import { Renderer } from './Renderer';

export class Game { 
	private currentShotParams: ShotParams | null = null; 
	private shotStartTime: number | null = null; 
	private renderer: Renderer;
	private ballPosition: Position = { x: 0, y: 0 }; 
	
	constructor(containerId: string) { 
		console.log("Game module initialized"); 
		this.renderer = new Renderer(containerId); 
		this.renderer.draw({ ball: this.ballPosition });
	}

	public startShot(params: ShotParams): void {
		this.currentShotParams = params; 
		this.shotStartTime = Date.now(); 
		console.log("Starting shot with: ", params);
		this.gameLoop();
	}
	
	private gameLoop() {
		if (!this.currentShotParams || !this.shotStartTime) {
			return;
		}

		const currentTime = Date.now(); 
		const timeInSeconds = (currentTime - this.shotStartTime) / 1000;
		const ballPosition = calculatePositionAtTime(this.currentShotParams, timeInSeconds); 
		this.renderer.draw({ ball: ballPosition });	
		if (ballPosition.y < 0) {
			console.log("Shot Finished"); 
			this.currentShotParams = null;
			this.shotStartTime = null; 
		} else { 
			requestAnimationFrame(() => this.gameLoop());
		}

	}	

		
	
}	
