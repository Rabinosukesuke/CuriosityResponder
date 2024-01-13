export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ParentLogin: undefined;
    ChildChatScreen: {
        question?: string; 
        response?: string; 
      };    ChildHistoryScreen: undefined;
    MediaInputScreen: undefined;
    SettingsScreen:undefined;
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

export type ChatDataWithKey = {
    key: string;
    value: ChatData;
}