import { Position, ShotParams } from './types.ts'; 
import { HOOP_POSITION_M, RIM_LENGTH_M, BALL_RADIUS_M, BACKBOARD_SIZE_M, RIM_THICKNESS_PX, PIXELS_PER_METER, StageConfig } from './Constants.ts';

const gravity = 9.81 *1.5;


// Calculates the (x, y) position of the ball at a specific time after launch.
export function calculatePositionAtTime(params: ShotParams, time: number): Position {
	const { angle, velocity } = params; 
	const angleRadians = angle * (Math.PI/180); 
	
	const vx = velocity * Math.cos(angleRadians);
	const vy = velocity * Math.sin(angleRadians); 

	const x = vx * time; 
	const y = (vy * time) - (0.5 * gravity * Math.pow(time, 2)); 

	return { x, y }; 
}

// Calculates an array of positions (x,y) representing the trajectory path.
export function calculateTrajectoryPoints(params: ShotParams) {
	const pathPoints: Position[] = [];
  const timeStep = 0.05; 
  let time = 0;

  while (true) {
    const pos = calculatePositionAtTime(params, time);
    if (pos.y < 0) {
      break;
    }
    
    pathPoints.push(pos);
    time += timeStep;
  }
  return pathPoints;
}

export function calculateCollision(ballPos: Position, cfg: StageConfig): boolean {

	const hoop = cfg.hoopPosition!;
	const board = cfg.backboardSize!;

	const ballLeft = ballPos.x - BALL_RADIUS_M;
	const ballRight = ballPos.x + BALL_RADIUS_M;
	const ballTop = ballPos.y + BALL_RADIUS_M;
	const ballBottom = ballPos.y - BALL_RADIUS_M;


	const boardLeft = hoop.x;
	const boardRight = hoop.x + board.width;
	const boardTop = hoop.y + board.height / 2;
	const boardBottom = hoop.y - board.height / 2;

	const isOverlappingX = ballRight > boardLeft && ballLeft < boardRight;
	const isOverlappingY = ballTop > boardBottom && ballBottom < boardTop;
	
	return isOverlappingX && isOverlappingY;
}

export function calculateBasketMade(ballPos: Position, ballPrevPosition: Position, cfg: StageConfig): boolean {
	if (ballPrevPosition.y <= ballPos.y) return false;

	const hoop = cfg.hoopPosition!;
	const rimLength = cfg.rimLength!;
	const rimThickness = cfg.rimThicknessPx! / PIXELS_PER_METER;

	const ballLeft = ballPos.x - BALL_RADIUS_M;
	const ballRight = ballPos.x + BALL_RADIUS_M;
	const ballTop = ballPos.y + BALL_RADIUS_M;
	const ballBottom = ballPos.y - BALL_RADIUS_M;


	const rimTop = hoop.y + (RIM_THICKNESS_PX / 2);
    const rimBottom = hoop.y - (RIM_THICKNESS_PX / 2);
    const rimLeft = hoop.x - RIM_LENGTH_M;
    const rimRight = hoop.x + BACKBOARD_SIZE_M.width;

    const isWithinRimX = ballLeft > rimLeft && ballRight < rimRight;
    const isBelowRimY = ballTop < rimTop && ballBottom > rimBottom;

	if(!isWithinRimX || !isBelowRimY) return false;
	//console.log("ballX: %d, ballY: %d",ballPos.x*100, ballPos.y*100);
	//console.log("rimX: %d, rimY: %d",hoop.x*100, hoop.y*100);
    return isWithinRimX && isBelowRimY;

	
}

export function getAccuracyOffset(accuracy: number): number {
    // accuracy 1 → ±20%
    // accuracy 6 → ±0%
    const maxPercent = (6 - accuracy) * 0.04;
    return (Math.random() * 2 - 1) * maxPercent;
}

