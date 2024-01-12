import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatData, ChatDataWithKey } from "../types/type";
import { storage } from '../strage';

type ChatStorage = {
    getAllChat: () => Promise<ChatDataWithKey[]>
    storeChat: (chatData: ChatData) => Promise<void>
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
    };

    const storeChat = async (chatData: ChatData): Promise<void> => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const numOnlyKeys = keys.filter((key) => !Number.isNaN(Number(key)));
            if (numOnlyKeys.length == 0) {
                storage.save({
                    key: '0',
                    data: chatData,
                    expires: null,
                })
            } else {
                const lastKey = Math.max(...numOnlyKeys.map((key) => Number(key)));
                storage.save({
                    key: String(lastKey + 1),
                    data: chatData,
                    expires: null,
                })
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getAllChat,
        storeChat,
    }
}