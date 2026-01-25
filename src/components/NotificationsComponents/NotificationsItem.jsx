import styled from 'styled-components';

import { useResponsive } from '../../hooks/useResponsive';
import Avatar from '../Avatar';
import { IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';

const Item = styled.li`
	min-height: 66px;
	padding: 10px 14px 10px 20px;
	border-radius: 10px;
	display: flex;
	align-items: start;
	justify-content: space-between;
	background-color: var(--bg-info-board);

	&.read {
		background-color: transparent;
	}

	&:hover {
		background-color: var(--bg-blue-inactive-hover);
	}

	@media (max-width: 767px) {
		padding: 10px;
		border-radius: 10px;
		flex-direction: column;
		align-items: start;
		gap: 12px;
	}
`;

const Content = styled.div`
	display: flex;
	gap: 18px;

	@media (max-width: 767px) {
		gap: 15px;
	}
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
`;

const Message = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 25.2px;
	color: var(--color-black-change);
	margin-bottom: 12px;

	span {
		font-weight: 700;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 22.4px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 19.2px;
	}
`;

const Date = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);
`;

const Actions = styled.div`
	flex-shrink: 0;
	width: 76px;
	display: flex;
	align-items: center;
	gap: 8px;
	margin-left: auto;
`;

const BtnActions = styled.button`
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-accent);
`;

const PointRead = styled.div`
	flex-shrink: 0;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: var(--color-accent);
`;

const NotificationsItem = ({ notification, onItemClick, onRead, onDelete }) => {
	const { isMobile } = useResponsive();
	const { sender, message, read } = notification;
	const parts = message.split(sender.nickname);

	return (
		<Item className={`${read ? 'read' : ''}`}>
			<Content onClick={() => onItemClick(notification)}>
				<Avatar
					photo={sender.photoURL}
					name={sender.nickname}
					style={{
						flexShrink: '0',
						width: isMobile ? '30px' : '40px',
						height: isMobile ? '30px' : '40px',
					}}
				/>

				<TextBox>
					<Message>
						{parts[0]}
						<span>{sender.nickname}</span>
						{parts[1]}
					</Message>
					<Date>
						{notification.createdAt?.toDate
							? notification.createdAt.toDate().toLocaleString('ru-RU', {
									timeZone: 'Europe/Moscow',
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
									hour: '2-digit',
									minute: '2-digit',
								})
							: 'Date not available'}
					</Date>
				</TextBox>
			</Content>

			<Actions>
				<BtnActions
					onClick={(e) => {
						e.stopPropagation();
						onRead(notification.id);
					}}
				>
					{read ? (
						<IoCheckmarkCircleSharp size={20} />
					) : (
						<IoCheckmarkCircleOutline size={20} title="Mark as read" />
					)}
				</BtnActions>

				<BtnActions
					onClick={(e) => {
						e.stopPropagation();
						onDelete(notification.id);
					}}
				>
					<AiOutlineDelete size={20} title="Delete" />
				</BtnActions>

				{!read && <PointRead />}
			</Actions>
		</Item>
	);
};

export default NotificationsItem;
