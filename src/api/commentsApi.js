import {
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	arrayUnion,
	arrayRemove,
	collection,
	serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export const createComment = async ({ postId, text, user }) => {
	const commentData = {
		postId,
		text,
		createdAt: serverTimestamp(),
		likes: [],
		author: {
			id: user.uid,
		},
		replies: [],
	};

	const commentRef = await addDoc(collection(db, 'comments'), commentData);

	await updateDoc(doc(db, 'posts', postId), {
		comments: arrayUnion(commentRef.id),
	});

	return commentRef.id;
};

export const toggleCommentLike = async ({ commentId, userId, likes }) => {
	const commentRef = doc(db, 'comments', commentId);
	const liked = likes.includes(userId);

	await updateDoc(commentRef, {
		likes: liked ? arrayRemove(userId) : arrayUnion(userId),
	});
};

export const updateCommentText = async ({ commentId, text }) => {
	await updateDoc(doc(db, 'comments', commentId), { text });
};

export const deleteCommentById = async ({ commentId, postId }) => {
	await deleteDoc(doc(db, 'comments', commentId));

	await updateDoc(doc(db, 'posts', postId), {
		comments: arrayRemove(commentId),
	});
};
