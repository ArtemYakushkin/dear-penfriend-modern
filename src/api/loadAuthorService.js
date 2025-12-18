import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const loadAuthors = async (posts, authors) => {
	const newAuthors = {};
	const uniqueUids = [
		...new Set(posts.map((p) => p.author?.uid).filter(Boolean)),
	];

	for (const uid of uniqueUids) {
		if (!authors[uid]) {
			try {
				const authorSnap = await getDoc(doc(db, 'users', uid));
				if (authorSnap.exists()) {
					newAuthors[uid] = authorSnap.data();
				}
			} catch (err) {
				console.error('Author loading error:', err);
			}
		}
	}

	return newAuthors;
};
