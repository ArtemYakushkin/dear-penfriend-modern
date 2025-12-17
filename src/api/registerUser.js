import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';

export const uploadAvatar = async (file, uid) => {
	if (!file) return '';
	const avatarRef = ref(storage, `avatars/${uid}`);
	await uploadBytes(avatarRef, file);
	const url = await getDownloadURL(avatarRef);
	return url || '';
};

export const createUserDoc = async (uid, userData) => {
	const userRef = doc(collection(db, 'users'), uid);
	await setDoc(userRef, userData, { merge: true });
};

export const registerUser = async ({
	email,
	password,
	nickname,
	avatarFile,
	country,
	selectedProfession,
}) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password,
	);
	const user = userCredential.user;

	let avatarURL = '';
	if (avatarFile) {
		avatarURL = await uploadAvatar(avatarFile, user.uid);
	}

	await updateProfile(user, {
		displayName: nickname,
		photoURL: avatarURL,
	});

	const userData = {
		nickname,
		avatar: avatarURL || '',
		country,
		profession: selectedProfession,
		cover: '',
		aboutMe: '',
		createdPosts: [],
		createdComments: [],
		createdReplys: [],
		likedPosts: [],
		likedComments: [],
		facebook: '',
		instagram: '',
		telegram: '',
		savedPosts: [],
	};

	await createUserDoc(user.uid, userData);

	return { user, avatarURL };
};
