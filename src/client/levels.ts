import { StageConfig } from './gameplay/Constants.ts';

export const levels: Record<string, StageConfig> = {
    '1': {
        hoopPosition: { x: 12, y: 3 },
        rimLength: 4.6
    },
    '2': {
        hoopPosition: { x: 14, y: 6 },
        rimLength: 4.3
    },
    '3': {
        hoopPosition: { x: 10.5, y: 7.5 },
        rimLength: 4
    },
    '4': {
        hoopPosition: { x: 27, y: 2 },
        rimLength: 3.7
    },
    '5': {
        hoopPosition: { x: 17.5, y: 18 },
        rimLength: 3.4
    },
    '6': {
        hoopPosition: { x: 44, y: 16 },
        rimLength: 3.1
    }
};
