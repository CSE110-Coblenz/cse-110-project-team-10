import { StageConfig, BACKBOARD_SIZE_M, RIM_THICKNESS_PX} from './gameplay/Constants.ts';

export const levels: Record<string, StageConfig> = {
    '1': {
        hoopPosition: { x: 11, y: 3 },
        rimLength: 4.6,
        backboardSize: BACKBOARD_SIZE_M,
        rimThicknessPx: RIM_THICKNESS_PX
    },
    '2': {
        hoopPosition: { x: 14, y: 6 },
        rimLength: 4.3,
        backboardSize: BACKBOARD_SIZE_M,
        rimThicknessPx: RIM_THICKNESS_PX
    },
    '3': {
        hoopPosition: { x: 11, y: 11 },
        rimLength: 4,
        backboardSize: BACKBOARD_SIZE_M,
        rimThicknessPx: RIM_THICKNESS_PX
    },
    '4': {
        hoopPosition: { x: 37, y: 2 },
        rimLength: 3.7,
        backboardSize: BACKBOARD_SIZE_M,
        rimThicknessPx: RIM_THICKNESS_PX
    },
    '5': {
        hoopPosition: { x: 25, y: 20 },
        rimLength: 3.4,
        backboardSize: BACKBOARD_SIZE_M,
        rimThicknessPx: RIM_THICKNESS_PX
    },
    '6': {
        hoopPosition: { x: 44, y: 16 },
        rimLength: 3.1,
        backboardSize: BACKBOARD_SIZE_M,
        rimThicknessPx: RIM_THICKNESS_PX
    }
};
