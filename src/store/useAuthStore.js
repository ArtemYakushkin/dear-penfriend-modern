import { create } from 'zustand';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuthStore = create((set) => ({
	user: null,
	loading: true,

	init: () => {
		onAuthStateChanged(auth, (user) => {
			set({ user, loading: false });
			if (user) localStorage.setItem('user', JSON.stringify(user));
			else localStorage.removeItem('user');
		});
	},

	logout: (navigate) => {
		signOut(auth).then(() => {
			set({ user: null });
			localStorage.removeItem('user');
			localStorage.removeItem('rememberedEmail');
			localStorage.removeItem('rememberedPassword');
			if (navigate) navigate('/');
		});
	},
}));
