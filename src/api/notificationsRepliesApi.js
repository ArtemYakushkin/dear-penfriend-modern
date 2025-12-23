import {
	addDoc,
	doc,
	getDoc,
	collection,
	serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export const notifyCommentAuthorAboutReply = async ({
	postId,
	commentId,
	replyId,
	sender,
}) => {
	const commentRef = doc(db, 'comments', commentId);
	const commentSnap = await getDoc(commentRef);

	if (!commentSnap.exists()) return;

	const comment = commentSnap.data();

	if (comment.author.id === sender.id) return;

	await addDoc(collection(db, 'notifications'), {
		recipientId: comment.author.id,
		type: 'new_reply',

		postId,
		commentId,
		replyId,

		sender,
		message: `${sender.nickname} replied to your comment`,

		createdAt: serverTimestamp(),
		read: false,
	});
};
