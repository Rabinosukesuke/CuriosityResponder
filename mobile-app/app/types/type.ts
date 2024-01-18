export type RootStackParamList = {
    ChildChat: {
        question?: string;
        response?: string;
        datetime?: string;
    };
    ChildHistory: undefined;
    Home: undefined;
    Intro01: undefined;
    Intro02: undefined;
    Intro03: undefined;
    Intro04: undefined;
    Intro05: undefined;
    Intro06: undefined;
    Intro07: undefined;
    Intro08: undefined;
    MediaInput: undefined;
    ParentLogin: undefined;
    Settings: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Splash: undefined;
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
