import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type User } from "../types/type";

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = {
                uid: action.payload.uid,
                email: action.payload.email,
            }
        },
        resetUser(state) {
            state.user = null;
        }
    }
});

export const { setUser, resetUser } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth.user;
export default authSlice.reducer;
