import Konva from 'konva'; 
import { Position } from './types';
import { HOOP_POSITION_M } from './Constants';
import { BACKBOARD_SIZE_M, RIM_LENGTH_M, PIXELS_PER_METER, BALL_RADIUS_M, RIM_THICKNESS_PX, StageConfig} from './Constants';

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

	private config: Required<StageConfig>;

	constructor(containerId: string, stageConfig: StageConfig) {

		this.config = {
            hoopPosition: stageConfig.hoopPosition ?? HOOP_POSITION_M,
            backboardSize: stageConfig.backboardSize ?? BACKBOARD_SIZE_M,
            rimLength: stageConfig.rimLength ?? RIM_LENGTH_M,
            rimThicknessPx: stageConfig.rimThicknessPx ?? RIM_THICKNESS_PX
        };

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
        const board_x_px = this.config.hoopPosition.x * PIXELS_PER_METER;
        
        const board_y_top_meters = this.config.hoopPosition.y + (BACKBOARD_SIZE_M.height / 2);
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

        const rim_y_meters = this.config.hoopPosition.y;
        const rim_y_px = this.sceneHeight - (rim_y_meters * PIXELS_PER_METER);
        const rim_x_px = (this.config.hoopPosition.x - RIM_LENGTH_M) * PIXELS_PER_METER;
        
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


		//grid
		this.stage = new Konva.Stage({
			container: containerId,
			width: this.sceneWidth,
			height: this.sceneHeight,
		});
		const gridLayer = new Konva.Layer();
		const gridSize = 50; // px
		const width = this.sceneWidth;
		const height = this.sceneHeight;
		// vertical lines
		for (let x = 0; x < width; x += gridSize) {
			gridLayer.add(new Konva.Line({
				points: [x, 0, x, height],
				stroke: '#ccc',
				strokeWidth: 1,
				dash: [4, 2]
			}));
			// x coordinate label
			gridLayer.add(new Konva.Text({
				x: x + 2,
				y: 2,
				text: `${(x / PIXELS_PER_METER).toFixed(1)}m`,
				fontSize: 10,
				fill: '#888'
			}));
		}
		// horizontal lines
		for (let y = 0; y < height; y += gridSize) {
			gridLayer.add(new Konva.Line({
				points: [0, y, width, y],
				stroke: '#ccc',
				strokeWidth: 1,
				dash: [4, 2]
			}));

			// y coordinate label
			gridLayer.add(new Konva.Text({
				x: 2,
				y: y + 2,
				text: `${((height - y) / PIXELS_PER_METER).toFixed(1)}m`,
				fontSize: 10,
				fill: '#888'
			}));
		}
		this.stage.add(gridLayer);
		this.stage.add(this.layer);


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
