import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    createUserWithEmailAndPassword,
    UserCredential,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase';
import { RootState } from '../store';
import { User, EmailWithPassword } from "../types/type";

export const signUp = createAsyncThunk<User, EmailWithPassword, { rejectValue: string }>(
    'user/signUp',
    async ({ email, password }: EmailWithPassword, { rejectWithValue }) => {
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user: FirebaseUser = userCredential.user;
            return {
                uid: user.uid,
                email: user.email,
            }
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk<User, EmailWithPassword, { rejectValue: string }>(
    'user/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user: FirebaseUser = userCredential.user;
            return {
                uid: user.uid,
                email: user.email,
            }
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const signOut = createAsyncThunk<null, void, { rejectValue: string }>(
    'user/signOut',
    async (_, { rejectWithValue }) => {
        try {
            await firebaseSignOut(auth);
            return null;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            console.error(action.payload);
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(signIn.rejected, (state, action) => {
            console.error(action.payload);
        });
        builder.addCase(signOut.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(signOut.rejected, (state, action) => {
            console.error(action.payload);
        });
    },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
