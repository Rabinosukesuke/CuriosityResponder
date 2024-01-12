import { ChatData } from './types/type';
export const initialStorageData: Array<ChatData> = [
    {
        timestamp: new Date(2024, 1, 1),
        question: "1st question",
        answer: "1st answer",
        emoji: "happy",
    },
    {
        timestamp: new Date(2023, 1, 1),
        question: "2nd question",
        answer: "2nd answer",
        emoji: "normal",
    },
    {
        timestamp: new Date(2022, 1, 1),
        question: "3rd question",
        answer: "3rd answer",
        emoji: "sad",
    },
]