import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

export const signIn = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const sendResetPassword = async (email) => {
	return await sendPasswordResetEmail(auth, email);
};
