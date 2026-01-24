import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Создаёт объект уведомления для batch.set
export const createNotification = ({ recipientId, sender, type, message, meta = {} }) => {
	const ref = doc(collection(db, 'notifications'));

	return {
		ref,
		data: {
			recipientId,
			sender, // { uid, nickname, photoURL }
			type,
			message,
			meta,
			read: false,
			createdAt: serverTimestamp(),
		},
	};
};
