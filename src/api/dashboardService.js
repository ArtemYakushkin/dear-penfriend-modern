import { collection, getDocs, getDoc, doc, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

export const getCollectionData = async (name) => {
	const snapshot = await getDocs(collection(db, name));
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};

export const getUserById = async (id) => {
	const snap = await getDoc(doc(db, 'users', id));
	return snap.exists() ? snap.data() : null;
};

export const getPostById = async (id) => {
	const snap = await getDoc(doc(db, 'posts', id));
	return snap.exists() ? snap.data() : null;
};

export const deletePostCascade = async (postId) => {
	const batch = writeBatch(db);

	const postRef = doc(db, 'posts', postId);
	batch.delete(postRef);

	const commentsSnap = await getDocs(query(collection(db, 'comments'), where('postId', '==', postId)));

	const commentIds = [];

	commentsSnap.forEach((c) => {
		commentIds.push(c.id);
		batch.delete(doc(db, 'comments', c.id));
	});

	if (commentIds.length) {
		const repliesSnap = await getDocs(query(collection(db, 'replys'), where('commentId', 'in', commentIds)));

		repliesSnap.forEach((r) => {
			batch.delete(doc(db, 'replys', r.id));
		});
	}

	await batch.commit();
};

export const deleteCommentCascade = async (commentId) => {
	const batch = writeBatch(db);

	// replies
	const repliesSnap = await getDocs(query(collection(db, 'replys'), where('commentId', '==', commentId)));

	repliesSnap.forEach((r) => {
		batch.delete(doc(db, 'replys', r.id));
	});

	// comment
	batch.delete(doc(db, 'comments', commentId));

	await batch.commit();
};
