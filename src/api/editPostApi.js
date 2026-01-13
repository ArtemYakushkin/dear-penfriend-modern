import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';

export const getPostById = async (postId) => {
	const snap = await getDoc(doc(db, 'posts', postId));
	return snap.exists() ? snap.data() : null;
};

export const updatePost = async ({ postId, title, text, media, activeTab, quiz, poll }) => {
	const payload = {
		title,
		text,
		media,
		...(activeTab === 'Quiz' ? { quiz, poll: deleteField() } : {}),
		...(activeTab === 'Poll'
			? {
					poll: {
						question: poll.question,
						answers: ['Yes', 'No'],
						pollVotes: [0, 0],
					},
					quiz: deleteField(),
			  }
			: {}),
		...(activeTab === null ? { quiz: deleteField(), poll: deleteField() } : {}),
	};

	await updateDoc(doc(db, 'posts', postId), payload);
};
