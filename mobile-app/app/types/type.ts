export type RootStackParamList = {
    Home: undefined;
    Intro01: undefined;
    Intro02: undefined;
    Intro03: undefined;
    Intro04: undefined;
    Intro05: undefined;
    Intro06: undefined;
    Intro07: undefined;
    Intro08: undefined;
    LineChart: undefined;
    MediaInput: undefined;
    ParentLogin: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Splash: undefined;
    Drawer: undefined;
};

export type DrawerParamList = {
    CharacterSettings: undefined;
    ChildCombined: {
        question?: string;
        response?: string;
        datetime?: string;
        emoji?: "happy" | "normal" | "sad";
    };
    DailyHistory: undefined;
    Game: undefined;
    Settings: undefined;
}

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
