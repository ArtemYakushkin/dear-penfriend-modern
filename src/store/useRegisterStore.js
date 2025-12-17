import { create } from 'zustand';
import countryList from 'react-select-country-list';
import { registerUser } from '../api/registerUser';
import { validateAll } from '../utils/registerValidators';

const countries = countryList().getData();
const professions = ['Teacher', 'Student'];

export const useRegisterStore = create((set, get) => ({
	// form fields
	nickname: '',
	country: '',
	email: '',
	password: '',
	confirmPassword: '',
	selectedProfession: '',

	// UI
	showPassword: false,
	showDropdown: false,
	showCountryDropdown: false,

	// avatar
	avatarFile: null,
	imagePreview: null,

	// status
	loading: false,
	errorMessage: {},
	error: {},
	successMessage: '',

	// constants
	professions,
	countries,
	filteredCountries: [],

	/* ================= actions ================= */

	setField: (field, value) => set({ [field]: value }),

	togglePassword: () => set((s) => ({ showPassword: !s.showPassword })),

	setShowCountryDropdown: (value) => set({ showCountryDropdown: value }),

	handleCountryChange: (value) => {
		if (!value.trim()) {
			set({
				country: value,
				filteredCountries: [],
				showCountryDropdown: false,
			});
			return;
		}

		const filtered = countries.filter((c) =>
			c.label.toLowerCase().startsWith(value.toLowerCase()),
		);

		set({
			country: value,
			filteredCountries: filtered.slice(0, 8),
			showCountryDropdown: true,
		});
	},

	selectProfession: (profession) =>
		set({
			selectedProfession: profession,
			showDropdown: false,
		}),

	setAvatar: (file, preview) =>
		set({ avatarFile: file, imagePreview: preview }),

	validate: () => {
		const state = get();
		const errors = validateAll({
			nickname: state.nickname,
			email: state.email,
			password: state.password,
			confirmPassword: state.confirmPassword,
			selectedProfession: state.selectedProfession,
			country: state.country,
			countriesList: countries,
		});

		set({ errorMessage: errors });
		return Object.keys(errors).length === 0;
	},

	submit: async (onClose) => {
		const state = get();
		if (!get().validate()) return;

		set({ loading: true, error: {}, successMessage: '' });

		try {
			await registerUser({
				email: state.email,
				password: state.password,
				nickname: state.nickname,
				avatarFile: state.avatarFile,
				country: state.country,
				selectedProfession: state.selectedProfession,
			});

			set({ successMessage: 'Registration successful!' });
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				set({
					error: { general: 'User with this email already exists.' },
				});
			} else {
				set({ error: { general: 'Error during registration.' } });
			}
		} finally {
			set({ loading: false });
		}
	},

	reset: () =>
		set({
			nickname: '',
			country: '',
			email: '',
			password: '',
			confirmPassword: '',
			selectedProfession: '',
			avatarFile: null,
			imagePreview: null,
			errorMessage: {},
			error: {},
			successMessage: '',
		}),
}));
