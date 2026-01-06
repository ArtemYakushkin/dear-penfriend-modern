import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { validateProfile } from '../utils/editProfileValidation';
import { updateUserProfile } from '../api/editProfileApi';
import { PROFESSIONS } from '../constants/editProfileConstants';
import { useCountrySelect } from './useCountrySelect';

export const useEditProfile = ({ isOpen, user, initialData, onClose, setProfileState }) => {
	const [form, setForm] = useState({
		nickname: '',
		country: '',
		profession: '',
		avatar: '',
		cover: '',
		facebook: '',
		instagram: '',
		telegram: '',
	});

	const [errors, setErrors] = useState({});
	const [newAvatar, setNewAvatar] = useState(null);
	const [newCover, setNewCover] = useState(null);

	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownHeaderRef = useRef(null);

	const countryHook = useCountrySelect((value) => setForm((p) => ({ ...p, country: value })));

	useEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = 'hidden';

		setForm({
			nickname: initialData.nickname ?? '',
			country: initialData.country ?? '',
			profession: initialData.profession ?? '',
			avatar: initialData.avatar || '',
			cover: initialData.cover || '',
			facebook: initialData.facebookLink ?? '',
			instagram: initialData.instagramLink ?? '',
			telegram: initialData.telegramLink ?? '',
		});

		return () => (document.body.style.overflow = '');
	}, [
		isOpen,
		initialData.avatar,
		initialData.country,
		initialData.cover,
		initialData.facebookLink,
		initialData.instagramLink,
		initialData.nickname,
		initialData.profession,
		initialData.telegramLink,
	]);

	const onChange = (field) => (e) => {
		setForm((p) => ({ ...p, [field]: e.target.value }));
	};

	const onTelegramChange = (e) => {
		let value = e.target.value.trim();
		if (value.startsWith('@')) value = `https://t.me/${value.slice(1)}`;
		setForm((p) => ({ ...p, telegram: value }));
	};

	const onAvatarChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setNewAvatar(file);
		setForm((p) => ({ ...p, avatar: URL.createObjectURL(file) }));
	};

	const onCoverChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setNewCover(file);
		setForm((p) => ({ ...p, cover: URL.createObjectURL(file) }));
	};

	const onProfessionChange = (profession) => {
		setForm((p) => ({ ...p, profession }));
		setShowDropdown(false);
		dropdownHeaderRef.current?.blur();
	};

	const onSave = async () => {
		const validationErrors = validateProfile(form);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length) return;

		try {
			await updateUserProfile({ user, form, newAvatar, newCover });
			setProfileState((prev) => ({
				...prev,
				...form,
			}));
			toast.success('Profile updated successfully!');
			onClose();
		} catch (e) {
			console.error(e);
			toast.error('Failed to update profile.');
		}
	};

	return {
		form,
		setForm,
		errors,
		newAvatar,
		newCover,
		showDropdown,
		setShowDropdown,
		dropdownHeaderRef,
		professions: PROFESSIONS,
		countryHook,

		onChange,
		onTelegramChange,
		onAvatarChange,
		onCoverChange,
		onProfessionChange,
		onSave,
	};
};
