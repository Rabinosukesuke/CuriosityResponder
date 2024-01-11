import { StorageData } from './types/type';
export const initialStorageData: Array<StorageData> = [
    {
        timestamp: new Date(),
        question: "1st question",
        answer: "1st answer",
        emoji: "happy",
    },
    {
        timestamp: new Date(),
        question: "2nd question",
        answer: "2nd answer",
        emoji: "normal",
    },
    {
        timestamp: new Date(),
        question: "3rd question",
        answer: "3rd answer",
        emoji: "sad",
    },
]