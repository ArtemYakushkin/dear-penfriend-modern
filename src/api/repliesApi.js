import {
	addDoc,
	updateDoc,
	doc,
	arrayUnion,
	serverTimestamp,
	collection,
	deleteDoc,
	arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase';

export const createReply = async ({ postId, commentId, text, user }) => {
	const replyRef = await addDoc(collection(db, 'replys'), {
		postId,
		commentId,
		text,
		createdAt: serverTimestamp(),
		author: {
			uid: user.uid,
		},
	});

	await updateDoc(doc(db, 'comments', commentId), {
		replies: arrayUnion(replyRef.id),
	});

	return replyRef.id;
};

export const updateReplyText = async ({ replyId, text }) => {
	await updateDoc(doc(db, 'replys', replyId), { text });
};

export const deleteReplyById = async ({ replyId, commentId }) => {
	await deleteDoc(doc(db, 'replys', replyId));

	await updateDoc(doc(db, 'comments', commentId), {
		replies: arrayRemove(replyId),
	});
};
