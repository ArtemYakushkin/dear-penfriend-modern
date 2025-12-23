import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useResponsive } from '../hooks/useResponsive';
import { useAuthStore } from '../store/useAuthStore';
import { updateReplyText, deleteReplyById } from '../api/repliesApi';
import Avatar from './Avatar';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import {
	Item,
	Top,
	Content,
	Info,
	Header,
	User,
	Actions,
} from '../style/ReplyStyles';
import { Nickname, Date, Text, BtnAction } from '../style/EntryStyles';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const CommentReplyItem = ({ reply }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [selectedReply, setSelectedReply] = useState(null);
	const [editedText, setEditedText] = useState('');
	const { isMobile, isTablet } = useResponsive();
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);

	console.log(user);
	console.log(reply);

	return (
		<>
			<Item>
				<span></span>
				<Top>
					<Avatar
						photo={reply.author.avatar}
						name={reply.author.nickname}
						onClick={() => navigate(`/author/${reply.author.id}`)}
						style={{
							flexShrink: '0',
							width: isMobile
								? '32px'
								: isTablet
								? '32px'
								: '40px',
							height: isMobile
								? '32px'
								: isTablet
								? '32px'
								: '40px',
						}}
					/>
					<Content>
						<Info>
							<Header>
								<User>
									<Nickname>{reply.author.nickname}</Nickname>
									<Date>
										{reply.createdAt &&
										reply.createdAt.toDate
											? reply.createdAt
													.toDate()
													.toLocaleString('ru-RU', {
														timeZone:
															'Europe/Moscow',
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
										{reply.author.id === user?.uid && (
											<Actions>
												<button
													style={{
														color: 'var(--color-accent)',
													}}
													onClick={() => {
														setIsEditing(true);
														setSelectedReply(reply);
														setEditedText(
															reply.text,
														);
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
													<AiOutlineDelete
														size={20}
													/>
												</button>
											</Actions>
										)}
									</>
								)}
							</Header>

							<Text>{reply.text}</Text>
						</Info>

						{reply.author.id === user?.uid && (
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

			{isEditing && selectedReply && (
				<ModalEdit
					text={editedText}
					onTextChange={setEditedText}
					onSave={async () => {
						if (!editedText.trim()) return;
						await updateReplyText({
							replyId: reply.id,
							text: editedText,
						});
						setIsEditing(false);
					}}
					onCancel={() => setIsEditing(false)}
				/>
			)}

			{isDeleting && selectedReply && (
				<ModalDelete
					onConfirm={async () => {
						await deleteReplyById({
							replyId: reply.id,
							commentId: reply.commentId,
						});
						setIsDeleting(false);
					}}
					onCancel={() => setIsDeleting(false)}
				/>
			)}
		</>
	);
};

export default CommentReplyItem;
