import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export const incrementPostViews = async (postId) => {
	const ref = doc(db, 'posts', postId);
	await updateDoc(ref, {
		views: increment(1),
	});
};
