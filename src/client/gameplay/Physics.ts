import { Position, ShotParams } from './types.ts'; 
import { HOOP_POSITION_M, RIM_LENGTH_M, BALL_RADIUS_M, BACKBOARD_SIZE_M, RIM_THICKNESS_PX } from './Constants.ts';

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

export function calculateCollision(ballPos: Position): boolean {

  const ballLeft = ballPos.x - BALL_RADIUS_M;
  const ballRight = ballPos.x + BALL_RADIUS_M;
  const ballTop = ballPos.y + BALL_RADIUS_M;
  const ballBottom = ballPos.y - BALL_RADIUS_M;


  const boardLeft = HOOP_POSITION_M.x;
  const boardRight = HOOP_POSITION_M.x + BACKBOARD_SIZE_M.width;
  
  const boardTop = HOOP_POSITION_M.y + (BACKBOARD_SIZE_M.height / 2);
  const boardBottom = HOOP_POSITION_M.y - (BACKBOARD_SIZE_M.height / 2);

  const isOverlappingX = ballRight > boardLeft && ballLeft < boardRight;
  const isOverlappingY = ballTop > boardBottom && ballBottom < boardTop;
  
  return isOverlappingX && isOverlappingY;
}

export function calculateBasketMade(ballPos: Position, ballPrevPosition: Position): boolean {
  if (ballPrevPosition.y > ballPos.y) {
    const ballLeft = ballPos.x - BALL_RADIUS_M;
      const ballRight = ballPos.x + BALL_RADIUS_M;
      const ballTop = ballPos.y + BALL_RADIUS_M;
      const ballBottom = ballPos.y - BALL_RADIUS_M;

      const rimTop = (HOOP_POSITION_M.y - BACKBOARD_SIZE_M.height/2) + (RIM_THICKNESS_PX / 2);
      const rimBottom = (HOOP_POSITION_M.y - BACKBOARD_SIZE_M.height/2) - (RIM_THICKNESS_PX / 2);
      const rimLeft = HOOP_POSITION_M.x - RIM_LENGTH_M;
      const rimRight = HOOP_POSITION_M.x + BACKBOARD_SIZE_M.width;

      const isWithinRimX = ballLeft > rimLeft && ballRight < rimRight;
      const isBelowRimY = ballTop < rimTop && ballBottom > rimBottom;

      return isWithinRimX && isBelowRimY;
  }
  return false;
}

