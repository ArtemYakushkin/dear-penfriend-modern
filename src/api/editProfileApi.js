import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const updateUserProfile = async ({
	user,
	form,
	newAvatar,
	newCover,
}) => {
	let avatarURL = form.avatar;
	let coverURL = form.cover;

	if (newAvatar) {
		const avatarRef = ref(storage, `avatars/${user.uid}`);
		await uploadBytes(avatarRef, newAvatar);
		avatarURL = await getDownloadURL(avatarRef);
	}

	if (newCover) {
		const coverRef = ref(storage, `covers/${user.uid}`);
		await uploadBytes(coverRef, newCover);
		coverURL = await getDownloadURL(coverRef);
	}

	await updateProfile(user, {
		displayName: form.nickname,
		photoURL: avatarURL,
	});

	const payload = {
		nickname: form.nickname,
		country: form.country,
		profession: form.profession,
		avatar: avatarURL,
		cover: coverURL,
	};

	payload.telegram = form.telegram || '';
	payload.instagram = form.instagram || '';
	payload.facebook = form.facebook || '';

	await updateDoc(doc(db, 'users', user.uid), payload);
};
