import { ChatData } from "../types/type";
import { BACKEND_URL, BACKEND_API_KEY } from "@env";
import axios from "axios";

type BackendAPI = {
    fetchChatHistoryFromBackend: (uid: string) => Promise<ChatData[]>;
    periodFetchChatHistoryFromBackend: (uid: string, start: Date, end: Date) => Promise<ChatData[]>;
    storeChatHistoryToBackend: (uid: string, chatData: ChatData) => Promise<void>;
}

export const useBackendAPI = (): BackendAPI => {
    const headers = {
        "x-api-key": BACKEND_API_KEY
    }

    const fetchChatHistoryFromBackend = async (uid: string): Promise<ChatData[]> => {
        try {
            const body = {
                "operation": "get",
                "uid": uid as string,
            }
            const response = await axios.post(BACKEND_URL, body, { headers });

            const ChatDataArray: ChatData[] = [];
            for (const item of response["data"]["items"]) {
                ChatDataArray.push({
                    "question": item["question"],
                    "answer": item["answer"],
                    "datetime": new Date(item["datetime"]),
                    "emoji": item["emoji"],
                });
            }
            return ChatDataArray
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const periodFetchChatHistoryFromBackend = async (uid: string, start: Date, end: Date): Promise<ChatData[]> => {
        try {
            const body = {
                "operation": "periodGet",
                "uid": uid as string,
                "start": start.toISOString(),
                "end": end.toISOString(),
            }
            const response = await axios.post(BACKEND_URL, body, { headers });

            const ChatDataArray: ChatData[] = [];
            for (const item of response["data"]["items"]) {
                ChatDataArray.push({
                    "question": item["question"],
                    "answer": item["answer"],
                    "datetime": new Date(item["datetime"]),
                    "emoji": item["emoji"],
                });
            }
            return ChatDataArray
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const storeChatHistoryToBackend = async (uid: string, chatData: ChatData): Promise<void> => {
        try {
            const body = {
                "operation": "post",
                "item": {
                    "uid": uid as string,
                    "question": chatData.question,
                    "answer": chatData.answer,
                    "datetime": chatData.datetime.toISOString(),
                    "emoji": chatData.emoji,
                }
            }
            const response = await axios.post(BACKEND_URL, body, { headers });
            console.log(response["data"]);
        } catch (error) {
            console.error(error);
        }
    }
    return {
        fetchChatHistoryFromBackend,
        periodFetchChatHistoryFromBackend,
        storeChatHistoryToBackend
    }
}