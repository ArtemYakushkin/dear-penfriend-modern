import validator from 'validator';

export const validateNickname = (nickname) => {
	if (!nickname || !nickname.trim()) {
		return 'Nickname cannot be empty';
	}
	if (!/^[a-zA-Z0-9\s.,'-]+$/.test(nickname)) {
		return 'Please write your nickname in English';
	}
	return '';
};

export const validateEmail = (email) => {
	if (!validator.isEmail(email || '')) {
		return 'Please enter a valid email address';
	}
	return '';
};

export const validatePassword = (password) => {
	if (!validator.isLength(password || '', { min: 6 })) {
		return 'Your password must be more than 6 characters long';
	}
	return '';
};

export const validateConfirmPassword = (password, confirm) => {
	if (password !== confirm) {
		return 'The entered passwords are not the same';
	}
	return '';
};

export const validateProfession = (profession) => {
	if (!profession) {
		return 'Please choose one of the options';
	}
	return '';
};

export const validateCountry = (country, countriesList) => {
	if (!countriesList.find((c) => c.label === country)) {
		return 'Please write your country in English';
	}
	return '';
};

export const validateAll = ({
	nickname,
	email,
	password,
	confirmPassword,
	selectedProfession,
	country,
	countriesList,
}) => {
	const errors = {};

	const nickErr = validateNickname(nickname);
	if (nickErr) errors.nickname = nickErr;

	const emailErr = validateEmail(email);
	if (emailErr) errors.email = emailErr;

	const passErr = validatePassword(password);
	if (passErr) errors.password = passErr;

	const confirmErr = validateConfirmPassword(password, confirmPassword);
	if (confirmErr) errors.confirmPassword = confirmErr;

	const profErr = validateProfession(selectedProfession);
	if (profErr) errors.profession = profErr;

	const countryErr = validateCountry(country, countriesList || []);
	if (countryErr) errors.country = countryErr;

	return errors;
};
