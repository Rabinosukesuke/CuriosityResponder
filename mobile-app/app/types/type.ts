export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ParentLogin: undefined;
    ChildChatScreen: undefined;
    ChildHistoryScreen: undefined;
    MediaInputScreen: undefined;
};

export type User = {
    uid: string;
    email: string | null;
}

export type ChatData = {
    timestamp: Date;
    question: string;
    answer: string;
    emoji: "happy" | "normal" | "sad";
}

export type ChatRecord = {
    key: "chatData";
    id: string;
    value: ChatData;
}