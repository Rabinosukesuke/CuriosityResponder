import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatData, ChatDataWithKey } from "../types/type";

type ChatStorage = {
    getAllChat: () => Promise<ChatDataWithKey[]>
}

function isChatData(obj: any): obj is ChatData {
    if ("timestamp" in obj && "question" in obj && "answer" in obj && "emoji" in obj) {
        return true;
    }
    return false;
}

export const useChatStorage = (): ChatStorage => {
    const getAllChat = async (): Promise<ChatDataWithKey[]> => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const numOnlyKeys = keys.filter((key) => !Number.isNaN(Number(key)));
            const values = await AsyncStorage.multiGet(numOnlyKeys);
            const storageData: ChatDataWithKey[] = values
                .map((value) => {
                    const obj = JSON.parse(value[1] as string)["rawData"];
                    if (isChatData(obj)) {
                        try {
                            const new_obj: ChatData = {
                                timestamp: new Date(obj.timestamp),
                                question: obj.question,
                                answer: obj.answer,
                                emoji: obj.emoji
                            }
                            return {
                                key: value[0],
                                value: new_obj
                            }
                        } catch (error) {
                            console.error(error);
                            return null
                        }
                    }
                    else {
                        return null
                    }
                }).filter((item): item is ChatDataWithKey => item !== null);
            console.log(storageData);
            return storageData;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    return {
        getAllChat,
    }
}