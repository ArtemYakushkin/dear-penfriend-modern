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

export const useRepliesStore = create((set) => ({
	replies: [],
	loading: true,

	subscribeToReplies: (commentId) => {
		const q = query(
			collection(db, 'replys'),
			where('commentId', '==', commentId),
			orderBy('createdAt', 'desc'),
		);

		return onSnapshot(q, async (snap) => {
			const items = [];

			for (const docSnap of snap.docs) {
				const data = docSnap.data();

				const authorSnap = await getDoc(
					doc(db, 'users', data.author.uid),
				);

				items.push({
					id: docSnap.id,
					...data,
					author: authorSnap.exists()
						? {
								...authorSnap.data(),
								id: data.author.uid,
						  }
						: { nickname: 'Unknown', avatar: null },
				});
			}

			set({ replies: items, loading: false });
		});
	},
}));
