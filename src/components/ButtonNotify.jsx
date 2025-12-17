import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

import { useAuthStore } from '../store/useAuthStore';
import { db } from '../firebase';

import { FiBell } from 'react-icons/fi';

const Notify = styled(Link)`
	position: relative;
	margin-right: 30px;
	width: 52px;
	height: 52px;
	border-radius: 50%;
	background-color: var(--bg-drop-list);
	color: var(--color-black-change);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	@media (max-width: 767px) {
		margin-right: 0;
		width: 40px;
		height: 40px;
	}
`;

const Badge = styled.div`
	position: absolute;
	top: 0;
	right: -5px;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	background-color: var(--color-red);
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: Nunito Sans;
	font-weight: 600;
	font-size: 14px;
	line-height: 14px;
	color: var(--color-white);

	@media (max-width: 767px) {
		top: -7px;
		right: -10px;
	}
`;

const ButtonNotify = () => {
	const { user } = useAuthStore();
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		if (!user) return;

		const q = query(
			collection(db, 'notifications'),
			where('recipientId', '==', user.uid),
			where('read', '==', false),
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setNotifications(
				snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
			);
		});

		return () => unsubscribe();
	}, [user]);

	return (
		<Notify to="/notifications">
			<FiBell size={26} />
			{notifications.length > 0 && <Badge>{notifications.length}</Badge>}
		</Notify>
	);
};

export default ButtonNotify;
