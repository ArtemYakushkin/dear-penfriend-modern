import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useResponsive } from '../../hooks/useResponsive';
import { useAuthStore } from '../../store/useAuthStore';
import { toggleCommentLike, updateCommentText, deleteCommentById } from '../../api/commentsApi';

import Avatar from '../Avatar';
import ModalEdit from '../Modals/ModalEdit';
import ModalDelete from '../Modals/ModalDelete';
import CommentReplyForm from './CommentReplyForm';
import CommentReplyList from './CommentReplyList';
import { Container } from '../../style/Container';
import {
	Item,
	TopSection,
	Content,
	Info,
	Header,
	User,
	Nickname,
	Date,
	Text,
	CenterSection,
	Actions,
	BtnAction,
	BtnLike,
	ReplyBox,
	BottomSection,
	BtnMore,
} from '../../style/EntryStyles';

import { FaPlus, FaMinus } from 'react-icons/fa6';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const CommentItem = ({ comment, postId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [selectedComment, setSelectedComment] = useState(null);
	const [editedText, setEditedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const { isMobile, isTablet } = useResponsive();
	const [activeCommentId, setActiveCommentId] = useState(null);
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);

	const toggleReplyList = (commentId) => {
		setActiveCommentId((prev) => (prev === commentId ? null : commentId));
	};

	const content = (
		<>
			<Item>
				<TopSection>
					<Avatar
						photo={comment.author.avatar}
						name={comment.author.nickname}
						onClick={() => navigate(`/author/${comment.author.id}`)}
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
									<Nickname>{comment.author.nickname}</Nickname>
									<Date>
										{comment.createdAt && comment.createdAt.toDate
											? comment.createdAt.toDate().toLocaleString('ru-RU', {
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
										{comment.author.id === user?.uid && isMobile && (
											<Actions>
												<button
													style={{
														color: 'var(--color-accent)',
													}}
													onClick={() => {
														setIsEditing(true);
														setSelectedComment(comment);
														setEditedText(comment.text);
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
														setSelectedComment(comment);
													}}
												>
													<AiOutlineDelete size={20} />
												</button>
											</Actions>
										)}
									</>
								)}
							</Header>

							<Text>{comment.text}</Text>
						</Info>
					</Content>
				</TopSection>

				<CenterSection>
					<Actions>
						<BtnAction onClick={() => toggleReplyList(comment.id)}>
							{activeCommentId === comment.id ? 'Cancel reply' : 'Reply to comment'}
						</BtnAction>

						{!isMobile && comment.author.id === user?.uid && (
							<>
								<BtnAction
									onClick={() => {
										setIsEditing(true);
										setSelectedComment(comment);
										setEditedText(comment.text);
									}}
								>
									Edit comment
								</BtnAction>
								<BtnAction
									onClick={() => {
										setIsDeleting(true);
										setSelectedComment(comment);
									}}
								>
									Delete comment
								</BtnAction>
							</>
						)}
					</Actions>

					<BtnLike
						onClick={() =>
							toggleCommentLike({
								commentId: comment.id,
								userId: user?.uid,
								likes: comment.likes,
							})
						}
					>
						{comment.likes.includes(user?.uid) ? (
							<FaHeart size={isMobile ? 20 : 24} style={{ color: 'var(--color-red)' }} />
						) : (
							<FaRegHeart size={isMobile ? 20 : 24} style={{ color: 'var(--color-black-change)' }} />
						)}
						<span>{comment.likes.length}</span>
					</BtnLike>
				</CenterSection>

				{activeCommentId === comment.id && (
					<ReplyBox>
						<CommentReplyForm commentId={comment.id} postId={postId} />
						<CommentReplyList commentId={comment.id} />
					</ReplyBox>
				)}

				<BottomSection>
					<span></span>
					<BtnMore onClick={() => toggleReplyList(comment.id)}>
						{activeCommentId === comment.id ? (
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

			{isEditing && selectedComment && (
				<ModalEdit
					text={editedText}
					onTextChange={setEditedText}
					onSave={async () => {
						await updateCommentText({
							commentId: selectedComment.id,
							text: editedText,
						});

						setIsEditing(false);
						setSelectedComment(null);
					}}
					onCancel={() => {
						setIsEditing(false);
						setSelectedComment(null);
					}}
				/>
			)}

			{isDeleting && selectedComment && (
				<ModalDelete
					onConfirm={async () => {
						await deleteCommentById({
							commentId: selectedComment.id,
							postId: comment.postId,
						});

						setIsDeleting(false);
						setSelectedComment(null);
					}}
					onCancel={() => {
						setIsDeleting(false);
						setSelectedComment(null);
					}}
				/>
			)}
		</>
	);

	return isMobile ? <Container>{content}</Container> : content;
};

export default CommentItem;
