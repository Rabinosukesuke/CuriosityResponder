export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ParentLogin: undefined;
    ChildChatScreen: {
        question?: string;
        response?: string;
    };
    ChildHistoryScreen: undefined;
    MediaInputScreen: undefined;
    SettingsScreen: undefined;
    IntroScreen: undefined;
    SplashScreen: undefined;
};

export type User = {
    uid: string;
    email: string | null;
}

export type ChatData = {
    datetime: Date;
    question: string;
    answer: string;
    emoji: "happy" | "normal" | "sad";
}
