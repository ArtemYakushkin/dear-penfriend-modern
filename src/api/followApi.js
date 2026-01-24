import { doc, writeBatch, increment } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { createNotification } from './createNotification';
import { useAuthStore } from '../store/useAuthStore';

// Подписка
export const followUser = async ({ currentUserId, targetUserId, senderNickname }) => {
	const currentUser = useAuthStore.getState().user;

	if (!currentUserId || !targetUserId) return;

	const batch = writeBatch(db);

	try {
		const followRef = doc(db, 'users', currentUserId, 'following', targetUserId);
		const currentUserRef = doc(db, 'users', currentUserId);

		// Добавляем подписку в свою подколлекцию
		batch.set(followRef, { createdAt: new Date() });

		// Увеличиваем свой followingCount
		batch.update(currentUserRef, { followingCount: increment(1) });

		// Создаём уведомление
		const notification = createNotification({
			recipientId: targetUserId,
			sender: {
				uid: currentUser.uid,
				nickname: currentUser.displayName || 'Unknown', // fallback
				photoURL: currentUser.photoURL || '',
			},
			type: 'new_follow',
			message: `Subscribed to you ${' '}`,
		});

		batch.set(notification.ref, notification.data);

		await batch.commit();
		toast.success('You have subscribed!');
	} catch (err) {
		toast.error('Error in followUser');
		console.error('Error in followUser:', err);
	}
};

// Отписка
export const unfollowUser = async ({ currentUserId, targetUserId }) => {
	if (!currentUserId || !targetUserId) return;

	const batch = writeBatch(db);

	try {
		const followRef = doc(db, 'users', currentUserId, 'following', targetUserId);
		const currentUserRef = doc(db, 'users', currentUserId);

		batch.delete(followRef);
		batch.update(currentUserRef, { followingCount: increment(-1) });

		await batch.commit();
		console.log('✅ Unfollow batch committed!');
	} catch (err) {
		console.error('❌ Error in unfollowUser:', err);
	}
};

// import { doc, writeBatch, increment } from 'firebase/firestore';
// import { db } from '../firebase';
// import { createNotification } from './createNotification';

// export const followUser = async ({ currentUser, targetUserId }) => {
// 	if (!currentUser) throw new Error('User not logged in');

// 	const batch = writeBatch(db);

// 	// Подписка в подколлекцию
// 	const followRef = doc(db, 'users', currentUser.uid, 'following', targetUserId);
// 	batch.set(followRef, { createdAt: new Date() });

// 	// Счётчики
// 	const targetUserRef = doc(db, 'users', targetUserId);
// 	const currentUserRef = doc(db, 'users', currentUser.uid);
// 	batch.update(targetUserRef, { followersCount: increment(1) });
// 	batch.update(currentUserRef, { followingCount: increment(1) });

// 	// ✅ Уведомление
// 	const senderNickname = currentUser.nickname || 'Unknown';
// 	const senderPhoto = currentUser.photoURL || '';

// 	const notification = createNotification({
// 		recipientId: targetUserId,
// 		sender: {
// 			uid: currentUser.uid,
// 			nickname: senderNickname,
// 			photoURL: senderPhoto,
// 		},
// 		type: 'new_follow',
// 		message: 'subscribed to you',
// 	});

// 	batch.set(notification.ref, notification.data);

// 	await batch.commit();
// };

// export const unfollowUser = async ({ currentUser, targetUserId }) => {
// 	if (!currentUser) throw new Error('User not logged in');

// 	const batch = writeBatch(db);

// 	batch.delete(doc(db, 'users', currentUser.uid, 'following', targetUserId));
// 	batch.update(doc(db, 'users', targetUserId), { followersCount: increment(-1) });
// 	batch.update(doc(db, 'users', currentUser.uid), { followingCount: increment(-1) });

// 	await batch.commit();
// };
