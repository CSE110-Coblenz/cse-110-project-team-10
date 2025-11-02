import Konva from 'konva'; 
import { Position } from './types';

export interface GameState {
	ball: Position; 
}

const pixelsPerMeter = 30; 

export class Renderer {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private ball: Konva.Circle; 

	private sceneWidth = 800; 
	private sceneHeight = 600; 

	constructor(containerId: string) {
		this.stage = new Konva.Stage({
		container: containerId, 
		width: this.sceneWidth, 
		height: this.sceneHeight, 
		});

		this.layer = new Konva.Layer();
		this.stage.add(this.layer);
		this.ball = new Konva.Circle({ 
			x: 0, 
			y: 0, 
			radius: 20, 
			fill: 'orange',
			stroke: 'black', 
			strokeWidth: 2,
		});

		this.layer.add(this.ball);
		this.layer.draw();
	}

	public draw(state: GameState): void {
		this.ball.x(state.ball.x * pixelsPerMeter);
		this.ball.y(this.sceneHeight - (state.ball.y * pixelsPerMeter));
		this.layer.batchDraw(); 
	}
}
