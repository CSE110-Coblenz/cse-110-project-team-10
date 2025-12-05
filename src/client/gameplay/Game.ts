import { ShotParams, Position } from './types.ts';
import { calculateBasketMade, calculateCollision, calculatePositionAtTime, calculateTrajectoryPoints } from './Physics.ts'; 
import { Renderer, GameState } from './Renderer';
import { inputController } from './Input';
import { loadUserDB, updateUser } from "../userdata.ts";
import { levels } from "../levels.ts";
import { StageConfig } from './Constants.ts';

export class Game { 
	private currentShotParams: ShotParams | null = null; 
	private shotStartTime: number | null = null; 
	private renderer: Renderer;
	private ballPosition: Position = { x: 0, y: 0 }; 
	private ballPrevPosition: Position = { x: 0, y: 0 };
	private shotsTaken : number = 0;
	private score : number = 0;
	private inputController: inputController | null = null;
	private isShooting: boolean = false;
	private isGameOver: boolean = false;
	private config: StageConfig;
	
	constructor(containerId: string) { 
		console.log("Game module initialized"); 

		// Getting level number from URL
		const url = new URL(window.location.href);
		const level = url.searchParams.get("level") || "1";

		this.config = levels[level];

		this.renderer = new Renderer(containerId, this.config);
		this.renderer.draw({ ball: this.ballPosition, trajectory: [] });
	}

	public startShot(params: ShotParams): void {
		if (this.isShooting || this.isGameOver) {
			return; 
		}
		this.isShooting = true;
		this.currentShotParams = params; 
		this.shotStartTime = Date.now(); 
		this.shotsTaken++;
		this.inputController?.updateShotsDisplay(this.shotsTaken);
		this.gameLoop();
	}

	public setInputController(controller: inputController): void {
        this.inputController = controller;
    }


	public updateTrajectoryPreview(params: ShotParams) {
		const newState: GameState = { ball: this.ballPosition, trajectory: calculateTrajectoryPoints(params)};
		this.renderer.draw(newState);
	}

	public resetGame(): void {
        console.log("Resetting game...");
        this.isGameOver = false;
        this.shotsTaken = 0;
        this.inputController?.hideWinScreen();
        this.inputController?.updateShotsDisplay(this.shotsTaken);
        this.resetShot();
    }
	private resetShot(): void {
        this.isShooting = false;
        this.ballPosition = { x: 0, y: 0 };
        // Redraw ball at start, clear trajectory
        this.renderer.draw({ ball: this.ballPosition, trajectory: calculateTrajectoryPoints(this.currentShotParams? this.currentShotParams : { angle: 0, velocity: 0 }) });
    }

	private gameLoop() {
		if (!this.currentShotParams || !this.shotStartTime) {
			return;
		}

		const currentTime = Date.now(); 
		const timeInSeconds = (currentTime - this.shotStartTime) / 1000;
		this.ballPrevPosition = this.ballPosition;
		this.ballPosition = calculatePositionAtTime(this.currentShotParams, timeInSeconds);  
		const trajectoryPreview = calculateTrajectoryPoints(this.currentShotParams);
		this.renderer.draw({ ball: this.ballPosition, trajectory: trajectoryPreview });	
		
		
		if (calculateBasketMade(this.ballPosition, this.ballPrevPosition, this.config)) {
			console.log("Basket Made!"); 
			this.shotStartTime = null; 
			this.isGameOver = true; 
			this.isShooting = false; 
			this.score++;

			// Updating user status
			this.applyStageRewards();

			this.inputController?.showWinScreen(this.shotsTaken, this.currentShotParams);
            return;
		} else if (calculateCollision(this.ballPosition, this.config)) {
			console.log("Collision Detected with Backboard!");  
			this.isShooting = false;
			this.score--;
			this.resetShot();
		} else if (this.ballPosition.y < 0) {
			console.log("Shot Finished"); 
			this.isShooting = false;
			this.score--; 
			this.resetShot();
		} else { 
			requestAnimationFrame(() => this.gameLoop());
		}

	}	

	private applyStageRewards(){
		if (typeof window === "undefined" || !("localStorage" in window)) {
			return;
		}

		const name = window.localStorage.getItem("currentUser");
		if (!name) return;

		const db = loadUserDB();
		const user = db[name];
		if (!user) return;

		const url = new URL(window.location.href);
		const stage = Number(url.searchParams.get("level")) || 1;

		// Logic 
		if (stage === 1) user.stats.power = Math.max(user.stats.power, 2);
		if (stage === 2) {
			user.stats.power = Math.max(user.stats.power, 3);
			user.stats.technique = Math.max(user.stats.technique, 2);
		}
		if (stage === 3) user.stats.power = Math.max(user.stats.power, 4);
		if (stage === 4){
			user.stats.power = Math.max(user.stats.power, 5);
			user.stats.technique = Math.max(user.stats.technique, 3);
		}
		if (stage === 5) user.stats.power = Math.max(user.stats.power, 6);

		user.stats.accuracy = Math.max(user.stats.accuracy, stage + 1); 
		user.clearedStages = Math.max(user.clearedStages, stage);
				
		updateUser(user);
				
			

	}
	
}	
