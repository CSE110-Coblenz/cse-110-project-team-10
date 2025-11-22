import Konva from 'konva'; 
import { Position } from './types';

export interface GameState {
	ball: Position; 
	trajectory: Position[]; 
}

const pixelsPerMeter = 30; 

export class Renderer {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private ball: Konva.Circle; 
	private indicatorLine: Konva.Line; 

	private sceneWidth = 1450; 
	private sceneHeight = 450; 

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
		this.indicatorLine = new Konva.Line({
			dash: [10, 5],
			stroke: 'red',
			strokeWidth: 2,
		});

		this.layer.add(this.indicatorLine);
		this.layer.add(this.ball);
		this.layer.draw();
	}

	public draw(state: GameState): void {
		const { ball, trajectory } = state;
		this.ball.x(state.ball.x * pixelsPerMeter);
		this.ball.y(this.sceneHeight - (state.ball.y * pixelsPerMeter));
		

		const flatPixelArray = trajectory.flatMap(pos => {
			const px = pos.x * pixelsPerMeter;
			const py = this.stage.height() - (pos.y * pixelsPerMeter);
			return [px, py];
		});
		console.log("Rendering trajectory with points: ", flatPixelArray);
		this.indicatorLine.points(flatPixelArray);
		this.layer.batchDraw(); 
	}
}
