import { useNavigate } from 'react-router-dom';

import { useResponsive } from '../../hooks/useResponsive';
import Avatar from '../Avatar';
import { Item, Top, Content, Info, Header, User, Media, Actions } from '../../style/ReplyStyles';
import { Nickname, Date, Text, BtnAction } from '../../style/EntryStyles';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const MessageReplyItem = ({
	reply,
	currentUser,
	setIsEditing,
	setSelectedReply,
	setEditedText,
	setIsDeleting,
	setModalImageUrl,
	setIsModalImage,
}) => {
	const { isMobile, isTablet } = useResponsive();
	const navigate = useNavigate();

	return (
		<Item>
			<span></span>
			<Top>
				<Avatar
					photo={reply.from.avatar}
					name={reply.from.nickname}
					onClick={() => navigate(`/author/${reply.author.id}`)}
					style={{
						flexShrink: '0',
						width: isMobile ? '32px' : isTablet ? '32px' : '40px',
						height: isMobile ? '32px' : isTablet ? '32px' : '40px',
					}}
				/>

				<Content>
					<Info>
						<Header>
							<User>
								<Nickname>{reply.from.nickname}</Nickname>
								<Date>
									{reply.createdAt && reply.createdAt.toDate
										? reply.createdAt.toDate().toLocaleString('ru-RU', {
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
									{reply.from.uid === currentUser?.uid && (
										<Actions>
											<button
												style={{
													color: 'var(--color-accent)',
												}}
												onClick={() => {
													setIsEditing(true);
													setSelectedReply(reply);
													setEditedText(reply.text);
												}}
											>
												<AiOutlineEdit size={20} />
											</button>
											<button
												style={{
													color: 'var(--color-accent)',
												}}
												onClick={() => {
													setIsDeleting(true);
													setSelectedReply(reply);
												}}
											>
												<AiOutlineDelete size={20} />
											</button>
										</Actions>
									)}
								</>
							)}
						</Header>

						<Text>{reply.text}</Text>

						{reply.gif && (
							<Media
								onClick={() => {
									setModalImageUrl(reply.gif);
									setIsModalImage(true);
								}}
							>
								<img src={reply.gif} alt="gif" />
							</Media>
						)}

						{reply.image && (
							<Media
								onClick={() => {
									setModalImageUrl(reply.image);
									setIsModalImage(true);
								}}
							>
								<img src={reply.image} alt="reply" />
							</Media>
						)}
					</Info>

					{reply.from.uid === currentUser?.uid && (
						<Actions>
							<BtnAction
								onClick={() => {
									setIsEditing(true);
									setSelectedReply(reply);
									setEditedText(reply.text);
								}}
							>
								Edit Reply
							</BtnAction>
							<BtnAction
								onClick={() => {
									setIsDeleting(true);
									setSelectedReply(reply);
								}}
							>
								Delete Reply
							</BtnAction>
						</Actions>
					)}
				</Content>
			</Top>
		</Item>
	);
};

export default MessageReplyItem;
