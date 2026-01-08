import {
	addDoc,
	collection,
	serverTimestamp,
	query,
	where,
	orderBy,
	onSnapshot,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const sendMessageToDB = async (data) => {
	return addDoc(collection(db, 'authorMessages'), {
		...data,
		createdAt: serverTimestamp(),
	});
};

export const subscribeToMessages = (authorId, callback) => {
	const q = query(collection(db, 'authorMessages'), where('authorId', '==', authorId), orderBy('createdAt', 'desc'));

	return onSnapshot(q, (snapshot) => {
		callback(
			snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})),
		);
	});
};

export const deleteMessageFromDB = async (messageId) => {
	return deleteDoc(doc(db, 'authorMessages', messageId));
};

export const updateMessageInDB = async (messageId, newText) => {
	return updateDoc(doc(db, 'authorMessages', messageId), {
		message: newText.trim(),
	});
};
