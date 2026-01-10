import { db } from '../firebase';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';

export const notifyNewPost = async (postId, user, title) => {
	const usersSnapshot = await getDocs(collection(db, 'users'));

	usersSnapshot.forEach(async (u) => {
		if (u.id !== user.uid) {
			await addDoc(collection(db, 'notifications'), {
				recipientId: u.id,
				type: 'new_post',
				postId,
				postTitle: title,
				sender: {
					uid: user.uid,
					nickname: user.displayName,
					photoURL: user.photoURL,
				},
				message: `${user.displayName} published "${title}"`,
				createdAt: serverTimestamp(),
				read: false,
			});
		}
	});
};
