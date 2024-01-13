import { ChatData, ChatRecord } from "../types/type";
import { storage } from '../strage';
import { initialStorageData } from "../initialStrageData"

type ChatStorage = {
    initChatStorage: () => Promise<void>,
    getAllChat: () => Promise<ChatRecord[]>,
    storeChatDataInStorage: (chatData: ChatData) => Promise<void>
    updateChatDataInStorage: (ChatRecord: ChatRecord) => Promise<void>
    deleteAllChatDataFromStorage: () => Promise<void>
}

export const useChatStorage = (): ChatStorage => {

    const initChatStorage = async (): Promise<void> => {
        try {
            await deleteAllChatDataFromStorage();
            for (let i = 0; i < initialStorageData.length; i++) {
                await storage.save({
                    key: "chatData",
                    id: i.toString(),
                    data: initialStorageData[i],
                    expires: null,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAllChat = async (): Promise<any> => {
        try {
            const chatIds = await storage.getIdsForKey('chatData');
            const chatRecords: ChatRecord[] = [];
            for (const id of chatIds) {
                await storage.load({
                    key: 'chatData',
                    id: id,
                }).then((chatData) => {
                    chatRecords.push({
                        key: "chatData",
                        id: id,
                        value: chatData,
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }
            return chatRecords;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const storeChatDataInStorage = async (chatData: ChatData): Promise<void> => {
        try {
            const chatIds = await storage.getIdsForKey('chatData');
            if (chatIds.length == 0) {
                storage.save({
                    key: '0',
                    data: chatData,
                    expires: null,
                })
            } else {
                const maxChatIds = Math.max(...chatIds.map((id) => Number(id)));
                storage.save({
                    key: "chatData",
                    id: (maxChatIds + 1).toString(),
                    data: chatData,
                    expires: null,
                })
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateChatDataInStorage = async (chatRecord: ChatRecord): Promise<void> => {
        try {
            storage.save({
                key: chatRecord.key,
                id: chatRecord.id,
                data: chatRecord.value,
                expires: null,
            })
        } catch (error) {
            console.error(error);
        }
    };

    const deleteAllChatDataFromStorage = async (): Promise<void> => {
        try {
            const data = await storage.getAllDataForKey('chatData');
            if (data.length != 0) {
                await storage.clearMapForKey('chatData');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        initChatStorage,
        getAllChat,
        storeChatDataInStorage,
        updateChatDataInStorage,
        deleteAllChatDataFromStorage
    }
}