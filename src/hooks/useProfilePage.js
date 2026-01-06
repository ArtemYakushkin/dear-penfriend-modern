import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
	getUserProfile,
	getUserPostCount,
	subscribeToAuthorMessages,
	updateAboutMe,
} from '../api/profileApi';
import { stripHtml } from '../utils/textUtils';
import avatarPlaceholder from '../assets/avatarFalce.png';

export const useProfilePage = (user) => {
	const [state, setState] = useState({
		nickname: user?.displayName || '',
		avatar: user?.photoURL || avatarPlaceholder,
		country: '',
		profession: '',
		cover: '',
		aboutMe: '',
		facebook: '',
		instagram: '',
		telegram: '',
		postCount: 0,
		messages: [],
		errors: {},
	});

	const [author, setAuthor] = useState(null);

	useEffect(() => {
		const unsub = getAuth().onAuthStateChanged(setAuthor);
		return unsub;
	}, []);

	useEffect(() => {
		if (!user) return;

		getUserProfile(user.uid).then((data) => {
			if (!data) return;
			setState((s) => ({ ...s, ...data }));
		});

		getUserPostCount(user.uid).then((count) =>
			setState((s) => ({ ...s, postCount: count })),
		);

		return subscribeToAuthorMessages(user.uid, (messages) =>
			setState((s) => ({ ...s, messages })),
		);
	}, [user]);

	const publishAboutMe = async (text, setIsEditing) => {
		const plain = stripHtml(text).trim();
		if (plain && !/^[\u0020-\u007E]+$/.test(plain)) {
			setState((s) => ({
				...s,
				errors: { aboutMe: 'English only' },
			}));
			return;
		}

		await updateAboutMe(user.uid, text);
		setState((s) => ({
			...s,
			aboutMe: text,
			errors: {},
		}));
		setIsEditing(false);
	};

	return {
		state,
		setState,
		author,
		publishAboutMe,
	};
};
