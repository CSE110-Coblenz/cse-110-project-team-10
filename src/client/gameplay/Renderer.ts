import Konva from 'konva'; 
import { Position } from './types';
import { HOOP_POSITION_M } from './constants';
import { BACKBOARD_SIZE_M, RIM_LENGTH_M, PIXELS_PER_METER, BALL_RADIUS_M} from '../gameplay/constants';

export interface GameState {
	ball: Position; 
	trajectory: Position[]; 
}



export class Renderer {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private ball: Konva.Circle; 
	private indicatorLine: Konva.Line; 
	private backboard: Konva.Rect;
	private rim: Konva.Rect;

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
			radius: BALL_RADIUS_M * PIXELS_PER_METER, 
			fill: 'orange',
			stroke: 'black', 
			strokeWidth: 2,
		});
		this.indicatorLine = new Konva.Line({
			dash: [10, 5],
			stroke: 'red',
			strokeWidth: 2,
		});
		const boardWidth_px = BACKBOARD_SIZE_M.width * PIXELS_PER_METER;
        const boardHeight_px = BACKBOARD_SIZE_M.height * PIXELS_PER_METER;
        const board_x_px = HOOP_POSITION_M.x * PIXELS_PER_METER;
        
        const board_y_top_meters = HOOP_POSITION_M.y + (BACKBOARD_SIZE_M.height / 2);
        const board_y_px = this.sceneHeight - (board_y_top_meters * PIXELS_PER_METER);

        this.backboard = new Konva.Rect({
            x: board_x_px,
            y: board_y_px,
            width: boardWidth_px,
            height: boardHeight_px,
            fill: 'brown',
            stroke: 'black',
            strokeWidth: 2,
        });

        const rim_y_meters = HOOP_POSITION_M.y;
        const rim_y_px = this.sceneHeight - (rim_y_meters * PIXELS_PER_METER);
        const rim_x_px = (HOOP_POSITION_M.x - RIM_LENGTH_M) * PIXELS_PER_METER;
        
        this.rim = new Konva.Rect({
            x: rim_x_px,
            y: rim_y_px, // This is the top of the rim
            width: RIM_LENGTH_M * PIXELS_PER_METER,
            height: 0.1 * PIXELS_PER_METER,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 2,
        });
		this.layer.add(this.rim);
		this.layer.add(this.backboard);
		this.layer.add(this.indicatorLine);
		this.layer.add(this.ball);
		this.layer.draw();
	}

	public draw(state: GameState): void {
		const { ball, trajectory } = state;
		this.ball.x(state.ball.x * PIXELS_PER_METER);
		this.ball.y(this.sceneHeight - (state.ball.y * PIXELS_PER_METER));
		

		const flatPixelArray = trajectory.flatMap(pos => {
			const px = pos.x * PIXELS_PER_METER;
			const py = this.stage.height() - (pos.y * PIXELS_PER_METER);
			return [px, py];
		});
		this.indicatorLine.points(flatPixelArray);
		this.layer.batchDraw(); 
	}
}
