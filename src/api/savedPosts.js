import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchSavedPosts = async (userId) => {
	const snap = await getDoc(doc(db, 'users', userId));
	if (!snap.exists()) return [];
	return snap.data().savedPosts || [];
};

export const savePostApi = async (userId, postId) => {
	await updateDoc(doc(db, 'users', userId), {
		savedPosts: arrayUnion(postId),
	});
};
