import { useEffect, useState } from 'react';
import { fetchNotifications, markNotificationAsRead, removeNotification } from '../api/notificationsPageApi';

export const useNotifications = (user) => {
	const [notifications, setNotifications] = useState([]);
	const [filter, setFilter] = useState('all');
	const [lastVisible, setLastVisible] = useState(null);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		if (!user) return;

		const load = async () => {
			const res = await fetchNotifications({
				userId: user.uid,
				filter,
			});

			setNotifications(res.notifications);
			setLastVisible(res.lastVisible);
			setHasMore(res.hasMore);
		};

		load();
	}, [user, filter]);

	const loadMore = async () => {
		if (!lastVisible || !user) return;

		const res = await fetchNotifications({
			userId: user.uid,
			filter,
			lastVisible,
		});

		setNotifications((prev) => [...prev, ...res.notifications]);
		setLastVisible(res.lastVisible);
		setHasMore(res.hasMore);
	};

	const markAsRead = async (id) => {
		if (typeof id !== 'string') {
			console.error('markAsRead expected id, got:', id);
			return;
		}

		await markNotificationAsRead(id);

		setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
	};

	const markAsReadByNotification = async (notification) => {
		if (!notification?.id) {
			console.error('Invalid notification:', notification);
			return;
		}

		if (notification.read) return;

		await markAsRead(notification.id);
	};

	// const markAsRead = async (id) => {
	// 	await markNotificationAsRead(id);

	// 	setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
	// };

	// const markAsReadByNotification = async (notification) => {
	// 	if (notification.read) return;

	// 	await markNotificationAsRead(notification.id);

	// 	setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)));
	// };

	const deleteNotification = async (id) => {
		await removeNotification(id);
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	return {
		notifications,
		filter,
		setFilter,
		hasMore,
		loadMore,
		markAsRead,
		markAsReadByNotification,
		deleteNotification,
	};
};
