import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthStore } from '../store/useAuthStore';
import { useNotifications } from '../hooks/useNotifications';
import { getNotificationRoute } from '../utils/notificationNavigation';
import SelectNotify from '../components/NotificationsComponents/SelectNotify';
import NotificationsList from '../components/NotificationsComponents/NotificationsList';
import InfoBoard from '../components/InfoBoard';
import ButtonLg from '../components/Buttons/ButtonLg';
import PopularPosts from '../components/DifferentPosts/PopularPosts';
import { Container } from '../style/Container';

const Wrap = styled.div`
	padding: 30px 0 90px 0;

	@media (max-width: 767px) {
		margin-top: 81px;
		padding-top: 0;
	}
`;

const Inner = styled.div`
	padding: 50px 40px;
	background-color: var(--bg-white);
	border-radius: 30px;
	box-shadow: 0px 4px 16px 0px #2f7bf626;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 40px 30px;
	}

	@media (max-width: 767px) {
		padding: 40px 0;
		background-color: transparent;
		border-radius: 0px;
		box-shadow: none;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 28px;
	line-height: 33.6px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 36.4px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 30px;

	@media (max-width: 767px) {
		margin-top: 20px;
	}
`;

const NotificationsPage = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const {
		notifications,
		filter,
		setFilter,
		hasMore,
		loadMore,
		markAsRead,
		markAsReadByNotification,
		deleteNotification,
	} = useNotifications(user);

	const handleNotificationClick = async (notification) => {
		await markAsReadByNotification(notification);
		navigate(getNotificationRoute(notification));
	};

	return (
		<>
			<Wrap>
				<Container>
					<Inner>
						<Header>
							<Title>Notifications</Title>
							<SelectNotify filter={filter} onChange={setFilter} />
						</Header>

						{notifications.length > 0 ? (
							<NotificationsList
								notifications={notifications}
								onItemClick={handleNotificationClick}
								onRead={markAsRead}
								onDelete={deleteNotification}
							/>
						) : (
							<InfoBoard message={'No notifications'} />
						)}

						{hasMore && (
							<BtnBox>
								<ButtonLg
									onClick={loadMore}
									text={'View previous notifications'}
									style={{
										color: 'var(--color-accent-change)',
										border: '1px solid var(--color-accent-change)',
									}}
								/>
							</BtnBox>
						)}
					</Inner>
				</Container>
			</Wrap>

			<PopularPosts />
		</>
	);
};

export default NotificationsPage;
