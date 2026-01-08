import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

/* ================= IMAGE UPLOAD ================= */
export const uploadImage = async (file, userId) => {
	const storage = getStorage();
	const storageRef = ref(storage, `messages/${userId}-${Date.now()}-${file.name}`);

	await uploadBytes(storageRef, file);
	return getDownloadURL(storageRef);
};

/* ================= AUTHOR ================= */
export const fetchAuthorNickname = async (authorId) => {
	try {
		const snap = await getDoc(doc(db, 'users', authorId));
		return snap.exists() ? snap.data().nickname || 'Unknown Author' : 'Unknown Author';
	} catch (error) {
		console.error('fetchAuthorNickname error:', error);
		return 'Unknown Author';
	}
};

/* ================= NOTIFICATION ================= */
export const sendNotification = async (recipientId, user) => {
	try {
		await addDoc(collection(db, 'notifications'), {
			recipientId,
			type: 'new_message',
			sender: {
				uid: user.uid,
				nickname: user.displayName,
				photoURL: user.photoURL,
			},
			message: `${user.displayName} sent you a message`,
			createdAt: serverTimestamp(),
			read: false,
		});
	} catch (error) {
		console.error('sendNotification error:', error);
	}
};
