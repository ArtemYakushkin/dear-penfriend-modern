import { useNavigate } from 'react-router-dom';

import Avatar from '../Avatar';
import MessageReplyForm from './MessageReplyForm';
import MessageReplyList from './MessageReplyList';
import { useResponsive } from '../../hooks/useResponsive';
import {
	Item,
	TopSection,
	Content,
	Info,
	Header,
	User,
	Nickname,
	Date,
	Actions,
	Text,
	Media,
	CenterSection,
	BtnAction,
	ReplyBox,
	BottomSection,
	BtnMore,
} from '../../style/EntryStyles';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaPlus, FaMinus } from 'react-icons/fa6';

const MessageItem = ({
	message,
	user,
	isOwnerPage,
	showReplyForm,
	onEdit,
	onDelete,
	setModalImageUrl,
	setIsModalImage,
	activeMessageId,
	toggleReplyList,
}) => {
	const { isMobile, isTablet } = useResponsive();
	const navigate = useNavigate();

	return (
		<Item>
			<TopSection>
				<Avatar
					photo={message.senderAvatar}
					name={message.senderNickname}
					onClick={() => navigate(`/author/${message.senderId}`)}
					style={{
						flexShrink: '0',
						width: isMobile ? '40px' : isTablet ? '40px' : '48px',
						height: isMobile ? '40px' : isTablet ? '40px' : '48px',
					}}
				/>

				<Content>
					<Info>
						<Header>
							<User>
								<Nickname>{message.senderNickname}</Nickname>
								<Date>
									{message.createdAt && message.createdAt.toDate
										? message.createdAt.toDate().toLocaleString('ru-RU', {
												timeZone: 'Europe/Moscow',
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
												hour: '2-digit',
												minute: '2-digit',
										  })
										: 'Date not available'}
								</Date>
							</User>

							{isMobile && (
								<>
									{message.senderId === user?.uid && isMobile && (
										<Actions>
											<button
												style={{
													color: 'var(--color-accent)',
												}}
												onClick={() => onEdit(message)}
											>
												<AiOutlineEdit size={20} />
											</button>
											<button
												style={{
													color: 'var(--color-accent)',
												}}
												onClick={() => onDelete(message)}
											>
												<AiOutlineDelete size={20} />
											</button>
										</Actions>
									)}
								</>
							)}
						</Header>

						<Text>{message.message}</Text>

						{message.gif && (
							<Media
								onClick={() => {
									setModalImageUrl(message.gif);
									setIsModalImage(true);
								}}
							>
								<img src={message.gif} alt="gif" />
							</Media>
						)}

						{message.image && (
							<Media
								onClick={() => {
									setModalImageUrl(message.image);
									setIsModalImage(true);
								}}
							>
								<img src={message.image} alt="message" />
							</Media>
						)}
					</Info>
				</Content>
			</TopSection>

			<CenterSection>
				<Actions>
					{isOwnerPage && (
						<BtnAction onClick={() => toggleReplyList(message.id)}>
							{activeMessageId === message.id ? 'Cancel reply' : 'Reply to message'}
						</BtnAction>
					)}

					{!isMobile && message.senderId === user.uid && (
						<BtnAction onClick={() => onEdit(message)}>Edit message</BtnAction>
					)}

					{!isMobile && message.senderId === user.uid && (
						<BtnAction onClick={() => onDelete(message)}>Delete message</BtnAction>
					)}
				</Actions>
			</CenterSection>

			{activeMessageId === message.id && (
				<ReplyBox>
					{showReplyForm && (
						<MessageReplyForm
							replyToMessage={message}
							currentUser={{
								uid: user.uid,
								nickname: user.displayName,
								avatar: user.photoURL,
							}}
						/>
					)}
					<MessageReplyList messageId={message.id} />
				</ReplyBox>
			)}

			<BottomSection>
				<span></span>
				<BtnMore onClick={() => toggleReplyList(message.id)}>
					{activeMessageId === message.id ? (
						<>
							<div>
								<FaMinus size={14} />
							</div>
							<p>hide replies</p>
						</>
					) : (
						<>
							<div>
								<FaPlus size={14} />
							</div>
							<p>more replies</p>
						</>
					)}
				</BtnMore>
			</BottomSection>
		</Item>
	);
};

export default MessageItem;
