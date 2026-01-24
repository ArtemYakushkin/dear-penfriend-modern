import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchUserFollowing = async (userId) => {
	const followingCol = collection(db, 'users', userId, 'following');
	const snapshot = await getDocs(followingCol);

	// Возвращаем массив uid пользователей, на которых подписан userId
	return snapshot.docs.map((doc) => doc.id);
};

export const fetchUsersByIds = async (uids) => {
	const promises = uids.map((uid) => getDoc(doc(db, 'users', uid)));
	const snaps = await Promise.all(promises);
	return snaps.filter((snap) => snap.exists()).map((snap) => ({ id: snap.id, ...snap.data() }));
};
