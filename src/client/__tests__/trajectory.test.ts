import { describe, expect, it } from 'vitest';
import { calculatePositionAtTime, calculateTrajectoryPoints } from '../gameplay/Physics.ts';

const sampleParams = { angle: 50, velocity: 12 };
const timeStep = 0.05;

/*
 * These tests are to monitor and ensure that the proper trajectory is
 * returned in the game, for the user.
 */
describe('calculateTrajectoryPoints', () => {
	it('returns positions that match individual physics samples', () => {
		const trajectory = calculateTrajectoryPoints(sampleParams);
		expect(trajectory.length).toBeGreaterThan(1);

		trajectory.forEach((point, index) => {
			const expected = calculatePositionAtTime(sampleParams, index * timeStep);
			expect(point.x).toBeCloseTo(expected.x, 10);
			expect(point.y).toBeCloseTo(expected.y, 10);
			expect(point.y).toBeGreaterThanOrEqual(0);
		});
	});

		it('stops adding points once the ball would drop below the ground', () => {
			const trajectory = calculateTrajectoryPoints(sampleParams);
			const nextTime = trajectory.length * timeStep;
			const nextPosition = calculatePositionAtTime(sampleParams, nextTime);

			const lastPoint = trajectory[trajectory.length - 1];
			expect(nextPosition.y).toBeLessThan(0);
			expect(lastPoint?.y ?? 0).toBeGreaterThanOrEqual(0);
		});
});