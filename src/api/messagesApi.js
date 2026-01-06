import { addDoc, collection, serverTimestamp, deleteDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

export const uploadMessageImage = async (file, userId) => {
	const storage = getStorage();
	const storageRef = ref(storage, `messages/${userId}-${Date.now()}-${file.name}`);
	await uploadBytes(storageRef, file);
	return getDownloadURL(storageRef);
};

export const sendMessage = async ({ authorId, user, text, image, gif }) => {
	return addDoc(collection(db, 'authorMessages'), {
		authorId,
		senderId: user.uid,
		senderNickname: user.displayName,
		senderAvatar: user.photoURL,
		message: text,
		image: image || null,
		gif: gif || null,
		createdAt: serverTimestamp(),
	});
};

export const deleteMessage = (id) => deleteDoc(doc(db, 'authorMessages', id));

export const updateMessage = (id, text) =>
	updateDoc(doc(db, 'authorMessages', id), {
		message: text.trim(),
	});

export const fetchAuthorNickname = async (authorId) => {
	const snap = await getDoc(doc(db, 'users', authorId));
	return snap.exists() ? snap.data().nickname : 'Unknown Author';
};
