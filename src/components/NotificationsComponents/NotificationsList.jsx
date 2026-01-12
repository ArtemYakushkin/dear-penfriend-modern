import styled from 'styled-components';

import NotificationsItem from './NotificationsItem';

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 14px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 8px;
	}

	@media (max-width: 767px) {
		gap: 8px;
	}
`;

const NotificationsList = ({ notifications, onItemClick, onRead, onDelete }) => {
	return (
		<List>
			{notifications.map((notification) => (
				<NotificationsItem
					key={notification.id}
					notification={notification}
					onItemClick={onItemClick}
					onRead={onRead}
					onDelete={onDelete}
				/>
			))}
		</List>
	);
};

export default NotificationsList;
