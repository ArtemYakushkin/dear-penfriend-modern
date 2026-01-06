import {
	doc,
	getDoc,
	updateDoc,
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

export const getUserProfile = async (userId) => {
	const ref = doc(db, 'users', userId);
	const snap = await getDoc(ref);
	return snap.exists() ? snap.data() : null;
};

export const getUserPostCount = async (userId) => {
	const ref = doc(db, 'users', userId);
	const snap = await getDoc(ref);
	return snap.exists() ? snap.data().createdPosts?.length || 0 : 0;
};

export const subscribeToAuthorMessages = (userId, callback) => {
	const q = query(
		collection(db, 'authorMessages'),
		where('authorId', '==', userId),
		orderBy('createdAt', 'desc'),
	);

	return onSnapshot(q, (snapshot) => {
		callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
	});
};

export const updateAboutMe = async (userId, aboutMe) => {
	const ref = doc(db, 'users', userId);
	await updateDoc(ref, { aboutMe });
};
