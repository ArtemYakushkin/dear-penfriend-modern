import {
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase';

export const handleLikePost = async ({
	postId,
	user,
	setLikesState,
	setModalOpenId,
}) => {
	if (!user || !user.uid) {
		setModalOpenId(postId);
		return;
	}

	const postRef = doc(db, 'posts', postId);
	const userRef = doc(db, 'users', user.uid);

	try {
		const postSnap = await getDoc(postRef);
		if (!postSnap.exists()) throw new Error('Post not found');

		const postData = postSnap.data();
		const likesArray = postData.likes || [];
		const isLiked = likesArray.includes(user.uid);

		await updateDoc(postRef, {
			likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
		});

		await updateDoc(userRef, {
			likedPosts: isLiked ? arrayRemove(postId) : arrayUnion(postId),
		});

		setLikesState((prev) => {
			const current = prev[postId] || {
				liked: false,
				likesCount: likesArray.length,
			};
			return {
				...prev,
				[postId]: {
					liked: !current.liked,
					likesCount: current.likesCount + (current.liked ? -1 : 1),
				},
			};
		});
	} catch (error) {
		console.error('Error updating like:', error);
	}
};
