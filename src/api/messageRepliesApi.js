import { db, storage } from '../firebase';
import {
	addDoc,
	collection,
	serverTimestamp,
	doc,
	deleteDoc,
	updateDoc,
	query,
	where,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadReplyImage = async (file) => {
	const imgRef = ref(storage, `messageReplies/${Date.now()}_${file.name}`);
	await uploadBytes(imgRef, file);
	return getDownloadURL(imgRef);
};

export const sendReplyApi = async ({ replyToMessage, currentUser, text, image, gif }) =>
	addDoc(collection(db, 'authorMessageReplies'), {
		replyToMessageId: replyToMessage.id,
		replyToAuthorId: replyToMessage.senderId,
		from: {
			uid: currentUser.uid,
			nickname: currentUser.nickname,
			avatar: currentUser.avatar,
		},
		text,
		image,
		gif,
		createdAt: serverTimestamp(),
	});

export const sendReplyNotificationApi = async (recipientId, currentUser) =>
	addDoc(collection(db, 'notifications'), {
		recipientId,
		sender: {
			uid: currentUser.uid,
			nickname: currentUser.nickname,
			photoURL: currentUser.avatar,
		},
		message: `${currentUser.nickname} replied to your message`,
		type: 'reply_to_message',
		createdAt: serverTimestamp(),
		read: false,
	});

export const subscribeRepliesApi = (messageId, cb) => {
	const q = query(
		collection(db, 'authorMessageReplies'),
		where('replyToMessageId', '==', messageId),
		orderBy('createdAt', 'desc'),
	);

	return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
};

export const editReplyApi = (id, text) => updateDoc(doc(db, 'authorMessageReplies', id), { text });

export const deleteReplyApi = (id) => deleteDoc(doc(db, 'authorMessageReplies', id));
