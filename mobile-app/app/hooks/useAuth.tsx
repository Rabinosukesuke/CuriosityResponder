import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    type UserCredential,
    type User as FirebaseUser,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { resetUser, setUser } from '../slices/authSlices';
import { type User } from '../types/type';

type Auth = {
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    autoSignIn: (user: FirebaseUser) => Promise<void>
}

export const useAuth = (): Auth => {
    const dispatch = useDispatch<AppDispatch>();

    const signUp = async (email: string, password: string): Promise<void> => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                const firebaseUser: FirebaseUser = userCredential.user;
                const user: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                }
                dispatch(setUser(user))
                console.log("sign up")
            })
            .catch((error) => {
                throw error;
            });
    };

    const signIn = async (email: string, password: string): Promise<void> => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                const firebaseUser: FirebaseUser = userCredential.user;
                const user: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                }
                dispatch(setUser(user))
                console.log("sign in")
            })
            .catch((error) => {
                throw error;
            });
    };

    const signOut = async (): Promise<void> => {
        await firebaseSignOut(auth)
            .then(() => {
                dispatch(resetUser())
                console.log("sign out");
            })
            .catch((error) => {
                throw error;
            });
    };

    const autoSignIn = async (user: FirebaseUser): Promise<void> => {
        const currentUser: User = {
            uid: user.uid,
            email: user.email,
        }
        dispatch(setUser(currentUser))
        console.log("auto sign in")
    }

    return {
        signUp,
        signIn,
        signOut,
        autoSignIn,
    }
}