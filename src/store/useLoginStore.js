import { create } from 'zustand';
import validator from 'validator';
import { signIn, sendResetPassword } from '../api/loginUser';

export const useLoginStore = create((set, get) => ({
	// ===== state =====
	email: '',
	password: '',
	errorMessage: {},
	error: '',
	successMessage: '',
	loading: false,
	showPassword: false,
	rememberMe: false,
	view: 'login', // login | reset | confirmReset

	// ===== actions =====
	setField: (field, value) =>
		set((state) => ({
			[field]: value,
			errorMessage: {
				...state.errorMessage,
				[field]: undefined,
			},
			error: '',
		})),

	setView: (view) =>
		set({
			view,
			error: '',
			errorMessage: {},
			successMessage: '',
		}),

	togglePassword: () => set((s) => ({ showPassword: !s.showPassword })),

	loadRemembered: () => {
		const email =
			localStorage.getItem('rememberedEmail') ||
			sessionStorage.getItem('rememberedEmail');

		const password =
			localStorage.getItem('rememberedPassword') ||
			sessionStorage.getItem('rememberedPassword');

		if (email && password) {
			set({
				email,
				password,
				rememberMe: true,
			});
		}
	},

	validate: () => {
		const { email, password, view } = get();
		const errors = {};

		if (!email) {
			errors.email = 'Email is required';
		} else if (!validator.isEmail(email)) {
			errors.email = 'Invalid email address';
		}

		if (view === 'login' && !password) {
			errors.password = 'Password is required';
		}

		set({ errorMessage: errors });
		return Object.keys(errors).length === 0;
	},

	submitLogin: async ({ onClose, onCloseUnreg } = {}) => {
		if (!get().validate()) return;

		const { email, password, rememberMe } = get();

		set({ loading: true, error: '', successMessage: '' });

		try {
			await signIn(email, password);

			if (rememberMe) {
				localStorage.setItem('rememberedEmail', email);
				localStorage.setItem('rememberedPassword', password);
			} else {
				sessionStorage.setItem('rememberedEmail', email);
				sessionStorage.setItem('rememberedPassword', password);
			}

			set({ successMessage: 'Login successful!' });

			if (onClose) onClose();
			if (onCloseUnreg) onCloseUnreg();
		} catch (err) {
			console.error(err);
			set({
				error: 'Error during login. Please check your credentials.',
			});
		} finally {
			set({ loading: false });
		}
	},

	resetPassword: async () => {
		const { email } = get();

		if (!validator.isEmail(email)) {
			set({ error: 'Please enter a valid email.' });
			return;
		}

		set({ loading: true, error: '', successMessage: '' });

		try {
			await sendResetPassword(email);
			set({
				view: 'confirmReset',
				successMessage: 'Reset email sent!',
			});
		} catch (err) {
			console.error(err);
			set({ error: 'Error sending reset email.' });
		} finally {
			set({ loading: false });
		}
	},

	reset: () =>
		set({
			email: '',
			password: '',
			errorMessage: {},
			error: '',
			successMessage: '',
			loading: false,
			showPassword: false,
			rememberMe: false,
			view: 'login',
		}),
}));
