export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ParentLogin: undefined;
};

export type EmailWithPassword = {
    email: string;
    password: string;
};

export type User = {
    uid: string;
    email: string | null;
}