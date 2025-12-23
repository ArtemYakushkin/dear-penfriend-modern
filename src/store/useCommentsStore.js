import { create } from 'zustand';
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
	doc,
	getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const useCommentsStore = create((set, get) => ({
	comments: [],
	loading: true,

	subscribeToComments: (postId) => {
		const q = query(
			collection(db, 'comments'),
			where('postId', '==', postId),
			orderBy('createdAt', 'desc'),
		);

		return onSnapshot(q, async (snap) => {
			const items = [];

			for (const docSnap of snap.docs) {
				const data = docSnap.data();
				const authorSnap = await getDoc(
					doc(db, 'users', data.author.id),
				);

				items.push({
					id: docSnap.id,
					...data,
					author: authorSnap.exists()
						? { ...authorSnap.data(), id: data.author.id }
						: { nickname: 'Unknown', avatar: null },
				});
			}

			set({ comments: items, loading: false });
		});
	},
}));
