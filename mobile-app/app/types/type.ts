export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ParentLogin: undefined;
    ChildChatScreen: undefined;
<<<<<<< HEAD
    SettingsScreen: undefined; 
=======
    ChildHistoryScreen: undefined;
    MediaInputScreen: undefined;

>>>>>>> origin/dev
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