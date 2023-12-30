export type EmailWithPassword = {
    email: string;
    password: string;
};

export type User = {
    uid: string;
    email: string | null;
}