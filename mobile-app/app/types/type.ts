export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ParentLogin: undefined;
    ChildChatScreen: undefined; 
    ChildHistory: undefined;
};

export type User = {
    uid: string;
    email: string | null;
}