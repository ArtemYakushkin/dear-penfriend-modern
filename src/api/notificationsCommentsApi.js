import {
	addDoc,
	doc,
	getDoc,
	collection,
	serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export const notifyPostAuthorAboutComment = async ({
	postId,
	commentId,
	sender,
}) => {
	const postRef = doc(db, 'posts', postId);
	const postSnap = await getDoc(postRef);

	if (!postSnap.exists()) return;

	const post = postSnap.data();

	if (post.author.uid === sender.id) return;

	await addDoc(collection(db, 'notifications'), {
		recipientId: post.author.uid,
		type: 'new_comment',

		postId,
		postTitle: post.title,
		commentId,

		sender,
		message: `${sender.nickname} commented on your post "${post.title}"`,

		createdAt: serverTimestamp(),
		read: false,
	});
};
