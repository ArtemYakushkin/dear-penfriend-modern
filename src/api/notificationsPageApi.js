import {
	getDocs,
	collection,
	query,
	where,
	orderBy,
	doc,
	deleteDoc,
	updateDoc,
	limit,
	startAfter,
} from 'firebase/firestore';
import { db } from '../firebase';

const PAGE_SIZE = 10;

export const fetchNotifications = async ({ userId, filter, lastVisible }) => {
	let q = query(
		collection(db, 'notifications'),
		where('recipientId', '==', userId),
		orderBy('createdAt', 'desc'),
		limit(PAGE_SIZE),
	);

	if (filter === 'unread') {
		q = query(
			collection(db, 'notifications'),
			where('recipientId', '==', userId),
			where('read', '==', false),
			orderBy('createdAt', 'desc'),
			limit(PAGE_SIZE),
		);
	}

	if (lastVisible) {
		q = query(q, startAfter(lastVisible));
	}

	const snapshot = await getDocs(q);

	return {
		notifications: snapshot.docs.map((d) => ({ id: d.id, ...d.data() })),
		lastVisible: snapshot.docs.at(-1) || null,
		hasMore: snapshot.docs.length === PAGE_SIZE,
	};
};

export const markNotificationAsRead = (id) => updateDoc(doc(db, 'notifications', id), { read: true });

export const removeNotification = (id) => deleteDoc(doc(db, 'notifications', id));
