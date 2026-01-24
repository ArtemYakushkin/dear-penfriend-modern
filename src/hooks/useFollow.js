import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { followUser, unfollowUser } from '../api/followApi';

export const useFollow = (targetUserId, currentUser) => {
	const [isFollowing, setIsFollowing] = useState(false);
	const [loading, setLoading] = useState(false);

	// Проверяем, подписан ли текущий пользователь
	useEffect(() => {
		if (!currentUser || !targetUserId) return;

		const check = async () => {
			try {
				const ref = doc(db, 'users', currentUser.uid, 'following', targetUserId);
				const snap = await getDoc(ref);
				setIsFollowing(snap.exists());
			} catch (err) {
				console.error('❌ Error checking follow status:', err);
			}
		};

		check();
	}, [currentUser, targetUserId]);

	const follow = async () => {
		if (!currentUser) return;

		setLoading(true);
		await followUser({
			currentUserId: currentUser.uid,
			targetUserId,
			senderNickname: currentUser.nickname,
		});
		setIsFollowing(true);
		setLoading(false);
	};

	const unfollow = async () => {
		if (!currentUser) return;

		setLoading(true);
		await unfollowUser({
			currentUserId: currentUser.uid,
			targetUserId,
		});
		setIsFollowing(false);
		setLoading(false);
	};

	return {
		isFollowing,
		loading,
		follow,
		unfollow,
	};
};

// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import { followUser, unfollowUser } from '../api/followApi';

// export const useFollow = (targetUserId, currentUser) => {
// 	const [isFollowing, setIsFollowing] = useState(false);
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		if (!currentUser || !targetUserId) return;

// 		const checkFollowing = async () => {
// 			const ref = doc(db, 'users', currentUser.uid, 'following', targetUserId);
// 			const snap = await getDoc(ref);
// 			setIsFollowing(snap.exists());
// 		};

// 		checkFollowing();
// 	}, [currentUser, targetUserId]);

// 	const follow = async () => {
// 		if (!currentUser) return;

// 		setLoading(true);
// 		await followUser({ currentUser, targetUserId });
// 		setIsFollowing(true);
// 		setLoading(false);
// 	};

// 	const unfollow = async () => {
// 		if (!currentUser) return;

// 		setLoading(true);
// 		await unfollowUser({ currentUser, targetUserId });
// 		setIsFollowing(false);
// 		setLoading(false);
// 	};

// 	return { isFollowing, loading, follow, unfollow };
// };
