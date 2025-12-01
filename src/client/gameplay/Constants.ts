import type { Position } from './types.ts';

// Physics Constants
export const GRAVITY_CONST = 15;
export const TIME_STEP = 0.05;

// Rendering Constants
export const PIXELS_PER_METER = 20;

export interface StageConfig {
	hoopPosition?: Position;
	backboardSize?: { width: number; height: number };
	rimLength?: number;
	rimThicknessPx?: number;
}

type StageAwareWindow = Window & { stageConfig?: StageConfig };

const DEFAULT_HOOP_POSITION: Position = { x: 28, y: 10 };
const DEFAULT_BACKBOARD_SIZE = { width: 0.2, height: 4 };
const DEFAULT_RIM_LENGTH = 4;
const DEFAULT_RIM_THICKNESS_PX = 5;

const stageConfig: StageConfig | undefined =
	typeof window !== 'undefined' ? (window as StageAwareWindow).stageConfig : undefined;

// Hoop Constants (stage overrides fall back to defaults)
export const HOOP_POSITION_M = stageConfig?.hoopPosition ?? DEFAULT_HOOP_POSITION;
export const BACKBOARD_SIZE_M = stageConfig?.backboardSize ?? DEFAULT_BACKBOARD_SIZE;
export const RIM_LENGTH_M = stageConfig?.rimLength ?? DEFAULT_RIM_LENGTH;
export const RIM_THICKNESS_PX = stageConfig?.rimThicknessPx ?? DEFAULT_RIM_THICKNESS_PX;
export const BALL_RADIUS_M = 0.75;
