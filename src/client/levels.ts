import { StageConfig } from './gameplay/Constants.ts';

export const levels: Record<string, StageConfig> = {
    '1': {
        hoopPosition: { x: 22, y: 9.5 },
        rimLength: 4.6
    },
    '2': {
        hoopPosition: { x: 25, y: 9.8 },
        rimLength: 4.3
    },
    '3': {
        hoopPosition: { x: 28, y: 10 },
        rimLength: 4
    },
    '4': {
        hoopPosition: { x: 31, y: 10.2 },
        rimLength: 3.7
    },
    '5': {
        hoopPosition: { x: 34, y: 10.5 },
        rimLength: 3.4
    },
    '6': {
        hoopPosition: { x: 37, y: 10.8 },
        rimLength: 3.1
    }
};
