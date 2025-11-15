import { Position, ShotParams } from './types.ts'; 

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
  console.log("Calculated trajectory points: ", pathPoints);
  return pathPoints;
}
