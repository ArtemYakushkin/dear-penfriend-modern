import { db, storage } from '../firebase';
import { addDoc, collection, Timestamp, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { notifyNewPost } from './notificationsCreatePostApi';

export const createPost = async ({ user, title, text, files, quiz, poll, activeTab }) => {
	const mediaUrls = await Promise.all(
		files.map(async (file) => {
			const storageRef = ref(storage, `posts/${file.name}`);
			await uploadBytes(storageRef, file);
			return getDownloadURL(storageRef);
		}),
	);

	const postData = {
		title,
		text,
		media: mediaUrls,
		createdAt: Timestamp.now().toDate().toISOString(),
		comments: [],
		likes: [],
		views: 0,
		author: {
			uid: user.uid,
			nickname: user.displayName || 'Anonymous',
		},
	};

	if (activeTab === 'Quiz') postData.quiz = quiz;
	if (activeTab === 'Poll') postData.poll = poll;

	const postRef = await addDoc(collection(db, 'posts'), postData);

	await notifyNewPost(postRef.id, user, title);

	await updateDoc(doc(db, 'users', user.uid), {
		createdPosts: arrayUnion({ id: postRef.id }),
	});
};
