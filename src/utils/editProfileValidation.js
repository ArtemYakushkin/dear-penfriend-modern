import { SOCIAL_REGEX, ENGLISH_REGEX } from '../constants/editProfileConstants';

export const validateProfile = (data) => {
	const errors = {};

	if (!data.nickname.trim()) {
		errors.nickname = 'Nickname is required';
	} else if (!ENGLISH_REGEX.test(data.nickname)) {
		errors.nickname = 'Nickname must contain only English characters';
	}

	if (!data.country.trim()) {
		errors.country = 'Country is required';
	} else if (!ENGLISH_REGEX.test(data.country)) {
		errors.country = 'Country must contain only English characters';
	}

	if (data.facebook && !SOCIAL_REGEX.facebook.test(data.facebook)) {
		errors.facebook = 'Invalid Facebook URL';
	}

	if (data.instagram && !SOCIAL_REGEX.instagram.test(data.instagram)) {
		errors.instagram = 'Invalid Instagram URL';
	}

	if (data.telegram && !SOCIAL_REGEX.telegram.test(data.telegram)) {
		errors.telegram = 'Invalid Telegram URL';
	}

	return errors;
};
