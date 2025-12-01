import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Game } from '../gameplay/Game.ts';
import {
	calculateBasketMade,
	calculateCollision,
	calculatePositionAtTime,
	calculateTrajectoryPoints,
} from '../gameplay/Physics.ts';

const rendererMocks = vi.hoisted(() => {
	const draw = vi.fn();
	const ctor = vi.fn().mockImplementation(function (this: { draw: ReturnType<typeof vi.fn> }) {
		this.draw = draw;
	});
	return { draw, ctor };
});
const rendererDraw = rendererMocks.draw;
const rendererCtor = rendererMocks.ctor;

vi.mock('../gameplay/Renderer.ts', () => ({
	Renderer: rendererMocks.ctor,
}));

vi.mock('../gameplay/Physics.ts', () => ({
	calculatePositionAtTime: vi.fn(),
	calculateTrajectoryPoints: vi.fn(),
	calculateBasketMade: vi.fn(),
	calculateCollision: vi.fn(),
}));

const mockedPosition = vi.mocked(calculatePositionAtTime);
const mockedTrajectory = vi.mocked(calculateTrajectoryPoints);
const mockedBasket = vi.mocked(calculateBasketMade);
const mockedCollision = vi.mocked(calculateCollision);

const readShotsTaken = (game: Game) => (game as unknown as { shotsTaken: number }).shotsTaken;
const rafMocks = vi.hoisted(() => ({
	requestAnimationFrame: vi.fn(),
}));
describe('Game scoring', () => {
	beforeEach(() => {
		rendererDraw.mockReset();
		rendererCtor.mockClear();
		mockedPosition.mockReset();
		mockedTrajectory.mockReset();
		mockedBasket.mockReset();
			mockedCollision.mockReset();
			rafMocks.requestAnimationFrame.mockReset();
			vi.stubGlobal('requestAnimationFrame', rafMocks.requestAnimationFrame);
		});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('increments the amount of shots taken when shot is placed', () => {
		const dateSpy = vi.spyOn(Date, 'now');
		dateSpy.mockReturnValueOnce(0).mockReturnValue(1000);
		mockedPosition.mockReturnValue({ x: 1, y: 3 });
		mockedTrajectory.mockReturnValue([]);
		mockedBasket.mockReturnValue(true);
		mockedCollision.mockReturnValue(false);

		const game = new Game('canvas');
		game.startShot({ angle: 73, velocity: 28 });

		expect(readShotsTaken(game)).toBe(1);
		expect(mockedBasket).toHaveBeenCalledWith({ x: 1, y: 3 });
			expect(rafMocks.requestAnimationFrame).not.toHaveBeenCalled();
			dateSpy.mockRestore();
		});

	it('does not increment the score when the shot misses', () => {
		const dateSpy = vi.spyOn(Date, 'now');
		dateSpy.mockReturnValueOnce(0).mockReturnValue(500);
		mockedPosition.mockReturnValue({ x: 0, y: -1 });
		mockedTrajectory.mockReturnValue([]);
		mockedBasket.mockReturnValue(false);
		mockedCollision.mockReturnValue(false);

		const game = new Game('canvas');
		game.startShot({ angle: 30, velocity: 10 });

		expect(readShotsTaken(game)).toBe(1);
		expect(mockedBasket).toHaveBeenCalled();
			expect(rafMocks.requestAnimationFrame).not.toHaveBeenCalled();
			dateSpy.mockRestore();
		});
});
