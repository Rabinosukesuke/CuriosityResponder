import { ChatData } from "../types/type";
import { BACKEND_URL, BACKEND_API_KEY } from "@env";
import axios from "axios";

type BackendAPI = {
    fetchChatHistoryFromBackend: (uid: string) => Promise<ChatData>;
    storeChatHistoryToBackend: (uid: string, chatData: ChatData) => Promise<void>;
}

export const useBackendAPI = (): BackendAPI => {
    const fetchChatHistoryFromBackend = async (uid: string): Promise<any> => {
        try {
            const headers = {
                "x-api-key": BACKEND_API_KEY
            }
            const body = {
                "operation": "get",
                "uid": uid as string,
            }
            const response = await axios.post(BACKEND_URL, body, { headers });
            console.log(response["data"]);
        } catch (error) {
            console.error(error);
        }
    }

    const storeChatHistoryToBackend = async (uid: string, chatData: ChatData): Promise<void> => {
        try {
            const headers = {
                "x-api-key": BACKEND_API_KEY
            }
            const body = {
                "operation": "post",
                "item": {
                    uid: uid as string,
                    "question": chatData.question,
                    "answer": chatData.answer,
                    "datetime": chatData.timestamp.toISOString(),
                    "emoji": chatData.emoji,
                }
            }
            const response = await axios.post(BACKEND_URL, body, { headers });
            console.log(response["data"]);
        } catch (error) {
            console.error(error);
        }
    }
    return { fetchChatHistoryFromBackend, storeChatHistoryToBackend }
}