import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useResponsive } from '../hooks/useResponsive';
import { usePostsStore } from '../store/usePostsStore';

import Avatar from './Avatar';
import ButtonLg from './Buttons/ButtonLg';
import MediaCarousel from './MediaCarousel';
import Poll from './Poll';
import Quiz from './Quiz/Quiz';
import ButtonHigh from './Buttons/ButtonHigh';
import CommentForm from './Comments/CommentForm';
import CommentsList from './Comments/CommentsList';
import ModalUnregister from './Modals/ModalUnregister';
import { Container } from '../style/Container';

import { HiArrowLongLeft } from 'react-icons/hi2';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';

const Wrap = styled.div`
	width: 100%;
	padding: 30px 0;
	background-color: var(--bg-post-wrap);
	box-shadow: 0px 4px 16px 0px #2f7bf626;
	border-radius: 30px;
	margin-bottom: 60px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 44px;
	}

	@media (max-width: 767px) {
		padding: 40px 0;
		border-radius: 0px;
		margin-bottom: 40px;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40px;
	margin-bottom: 10px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 0 30px;
	}
`;

const AuthorBox = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	cursor: pointer;

	@media (max-width: 767px) {
		margin-bottom: 10px;
	}
`;

const Author = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
`;

const DateCreate = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);
`;

const Options = styled.div`
	display: flex;
	align-items: center;
	gap: 28px;

	@media (max-width: 767px) {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
		gap: 0px;
	}
`;

const BtnBack = styled.button`
	display: flex;
	align-items: center;
	gap: 16px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-accent);
	text-decoration: underline;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 10px;
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		gap: 10px;
		font-size: 16px;
		line-height: 16px;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	padding: 0 40px;
	margin-bottom: 20px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
		padding: 0 30px;
		margin-bottom: 10px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
		padding: 0px;
		margin-bottom: 28px;
	}
`;

const Media = styled.div`
	position: relative;
	width: 100%;
	height: 675px;
	margin-bottom: 52px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 353px;
		margin-bottom: 32px;
		padding: 0 30px;
	}

	@media (max-width: 767px) {
		max-width: 375px;
		height: 212px;
		margin-bottom: 30px;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const Text = styled.div`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	padding: 0 40px;
	margin-bottom: 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-weight: 400;
		font-size: 16px;
		line-height: 25.6px;
		padding: 0 30px;
		margin-bottom: 20px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
		margin-bottom: 20px;
		padding: 0px;
	}
`;

const Exam = styled.div`
	padding: 0 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 0 30px;
	}

	@media (max-width: 767px) {
		background-color: var(--bg-poll-quiz);
		padding: 0px;
	}
`;

const Border = styled.div`
	padding: 0 40px;
	margin: 40px 0;

	div {
		width: 100%;
		height: 1px;
		background-color: var(--color-grey-light);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 0 30px;
		margin: 20px 0;
	}

	@media (max-width: 767px) {
		padding: 0px;
		margin: 20px 0;
	}
`;

const Activity = styled.div`
	padding: 0 40px;
	display: flex;
	align-items: center;
	gap: 30px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 0 30px;
	}

	@media (max-width: 767px) {
		justify-content: space-between;
		padding: 0px;
	}
`;

const IconsBox = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 5px;
	}

	@media (max-width: 767px) {
		gap: 5px;
	}
`;

const Icon = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 8px;
	border-radius: 5px;
	background-color: var(--bg-auth-input);

	span {
		font-weight: 400;
		font-size: 14px;
		line-height: 16.59px;
		color: var(--color-black-change);
	}

	@media (max-width: 767px) {
		gap: 3px;
		padding: 4px 6px;

		span {
			font-size: 12px;
			line-height: 12px;
		}
	}
`;

const ViewBox = styled.div`
	display: none;

	@media (min-width: 768px) and (max-width: 1259px) {
		display: block;
	}
`;

const BtnView = styled.button`
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-grey-change);
	text-decoration: underline;
	display: flex;
	align-items: center;
	gap: 5px;

	&:hover {
		color: var(--color-accent);
	}
`;

const BtnSave = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-black-change);
	margin-left: auto;
`;

const CommentsBox = styled.div`
	margin: 40px 40px 0px 40px;
	padding-top: 30px;
	border: 1px solid var(--bg-mode);
	border-radius: 30px;
	display: flex;
	flex-direction: column;
	max-height: 700px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin: 30px 30px 0px 30px;
		padding-top: 0px;
		border: none;
		border-radius: 0px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		max-height: none;
		overflow: visible;
	}

	@media (max-width: 767px) {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin: 0px;
		margin-top: 30px;
		border: none;
		border-radius: 0px;
		padding: 0px;
		max-height: none;
	}
`;

const Scroll = styled.div`
	position: relative;
	overflow-y: auto;
	max-height: 100%;
	padding-right: 28px;
	display: flex;
	gap: 12px;
	margin-right: 14px;

	@media (min-width: 768px) and (max-width: 1259px) {
		overflow: visible;
		padding-right: 0;
		margin-right: 0;
	}

	@media (max-width: 767px) {
		overflow-y: visible;
		max-height: none;
		padding-right: 0;
		margin-right: 0;
	}
`;

const Form = styled.div`
	padding: 30px 42px 30px 40px;
	border-top: 1px solid var(--bg-mode);
	margin-top: 30px;
`;

const ReturnBox = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 112px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 90px;
	}

	@media (max-width: 767px) {
		margin-bottom: 90px;
	}
`;

const DetailPost = ({ post, postId, user, author }) => {
	const [modalOpenId, setModalOpenId] = useState(null);
	const [commentsVisible, setCommentsVisible] = useState(false);
	const { isMobile, isTablet } = useResponsive();
	const navigate = useNavigate();
	const handleLike = usePostsStore((s) => s.handleLike);
	const { liked, likesCount } = usePostsStore((s) => s.likesState[post.id]) || {
		liked: false,
		likesCount: post.likes?.length || 0,
	};
	const isSaved = usePostsStore((s) => s.savedMap[post.id]);
	const savePost = usePostsStore((s) => s.savePost);

	const toggleCommentsVisibility = () => setCommentsVisible((prev) => !prev);

	const handleBack = () => {
		navigate('/', { replace: true });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{isMobile ? (
				<>
					<Wrap>
						<Container>
							<Options>
								<BtnBack onClick={() => navigate(-1)}>
									<HiArrowLongLeft size={18} />
									Go back
								</BtnBack>
								{user?.uid === post?.author?.uid && (
									<ButtonLg
										onClick={() => navigate(`/edit-post/${postId}`)}
										text={'Edit post'}
										style={{
											color: 'var(--color-white)',
											backgroundColor: 'var(--color-accent)',
										}}
									/>
								)}
							</Options>

							<AuthorBox onClick={() => navigate(`/author/${post.author.uid}`)}>
								<Avatar
									photo={author?.avatar}
									name={author?.nickname}
									style={{
										width: '48px',
										height: '48px',
									}}
								/>
								<div>
									<Author>{author?.nickname || 'Unknown Author'}</Author>
									<DateCreate>{new Date(post.createdAt).toLocaleDateString()}</DateCreate>
								</div>
							</AuthorBox>

							<Title>{post.title}</Title>
						</Container>

						<Media>
							{post.media.length > 1 ? (
								<MediaCarousel media={post.media} />
							) : post.media[0].includes('.mp4') ? (
								<video controls>
									<source src={post.media[0]} type="video/mp4" />
									Your browser does not support video.
								</video>
							) : (
								<img src={post.media[0]} alt="Post media" />
							)}
						</Media>

						<Container>
							<Text>
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={{
										p: ({ node, ...props }) => (
											<p
												style={{
													whiteSpace: 'pre-wrap',
													lineHeight: '1.6',
												}}
												{...props}
											/>
										),
									}}
								>
									{post.text || ''}
								</ReactMarkdown>
							</Text>
						</Container>

						<Exam>
							<Container>
								{post.quiz && post.quiz.question && post.quiz.answers && (
									<Quiz quizData={post.quiz} user={user} />
								)}
								{post.poll && <Poll pollData={post.poll} postId={postId} user={user} />}
							</Container>
						</Exam>

						<Container>
							<Border>
								<div></div>
							</Border>
						</Container>

						<Container>
							<Activity>
								<IconsBox>
									<Icon
										onClick={() => handleLike(post.id, setModalOpenId)}
										style={{ cursor: 'pointer' }}
									>
										{liked ? (
											<FaHeart
												size={24}
												style={{
													color: 'var(--color-red)',
												}}
											/>
										) : (
											<FaRegHeart
												size={24}
												style={{
													color: 'var(--color-black-change)',
												}}
											/>
										)}
										<span>{likesCount}</span>
									</Icon>
									<Icon>
										<FiEye
											size={24}
											style={{
												color: 'var(--color-black-change)',
											}}
										/>
										<span>{post.views || 0}</span>
									</Icon>
									<Icon>
										<BiComment
											size={24}
											style={{
												color: 'var(--color-black-change)',
											}}
										/>
										<span>{post.comments?.length || 0}</span>
									</Icon>
								</IconsBox>
								<BtnSave
									onClick={() => savePost(post.id)}
									disabled={!user || isSaved}
									style={{
										cursor: !user || isSaved ? 'not-allowed' : 'pointer',
									}}
								>
									{!user || isSaved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
								</BtnSave>
							</Activity>
						</Container>

						{/* <Container> */}
						<CommentsBox>
							<CommentForm postId={postId} />
							<CommentsList postId={postId} />
						</CommentsBox>
						{/* </Container> */}
					</Wrap>

					<ReturnBox>
						<ButtonHigh
							onClick={handleBack}
							text={'Back to homepage'}
							style={{
								border: '1px solid var(--color-accent-change)',
								color: 'var(--color-accent-change)',
								backgroundColor: 'transparent',
							}}
						/>
					</ReturnBox>
				</>
			) : (
				<Container>
					<Wrap>
						<Header>
							<AuthorBox onClick={() => navigate(`/author/${post.author.uid}`)}>
								<Avatar
									photo={author?.avatar}
									name={author?.nickname}
									style={{
										width: '48px',
										height: '48px',
									}}
								/>
								<div>
									<Author>{author?.nickname || 'Unknown Author'}</Author>
									<DateCreate>{new Date(post.createdAt).toLocaleDateString()}</DateCreate>
								</div>
							</AuthorBox>
							<Options>
								<BtnBack onClick={() => navigate(-1)}>
									{isTablet ? <HiArrowLongLeft size={24} /> : <HiArrowLongLeft size={28} />}
									Go back
								</BtnBack>
								{user?.uid === post?.author?.uid && (
									<ButtonLg
										onClick={() => navigate(`/edit-post/${postId}`)}
										text={'Edit post'}
										style={{
											color: 'var(--color-white)',
											backgroundColor: 'var(--color-accent)',
										}}
									/>
								)}
							</Options>
						</Header>

						<Title>{post.title}</Title>

						<Media>
							{post.media.length > 1 ? (
								<MediaCarousel media={post.media} />
							) : post.media[0].includes('.mp4') ? (
								<video controls>
									<source src={post.media[0]} type="video/mp4" />
									Your browser does not support video.
								</video>
							) : (
								<img src={post.media[0]} alt="Post media" />
							)}
						</Media>

						<Text>
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									p: ({ node, ...props }) => (
										<p
											style={{
												whiteSpace: 'pre-wrap',
												lineHeight: '1.6',
											}}
											{...props}
										/>
									),
								}}
							>
								{post.text || ''}
							</ReactMarkdown>
						</Text>

						<Exam>
							{post.quiz && post.quiz.question && post.quiz.answers && (
								<Quiz quizData={post.quiz} user={user} />
							)}
							{post.poll && <Poll pollData={post.poll} postId={postId} user={user} />}
						</Exam>

						<Border>
							<div></div>
						</Border>

						<Activity>
							<IconsBox>
								<Icon onClick={() => handleLike(post.id, setModalOpenId)} style={{ cursor: 'pointer' }}>
									{liked ? (
										<FaHeart
											size={24}
											style={{
												color: 'var(--color-red)',
											}}
										/>
									) : (
										<FaRegHeart
											size={24}
											style={{
												color: 'var(--color-black-change)',
											}}
										/>
									)}
									<span>{likesCount}</span>
								</Icon>
								<Icon>
									<FiEye
										size={24}
										style={{
											color: 'var(--color-black-change)',
										}}
									/>
									<span>{post.views || 0}</span>
								</Icon>
								<Icon>
									<BiComment
										size={24}
										style={{
											color: 'var(--color-black-change)',
										}}
									/>
									<span>{post.comments?.length || 0}</span>
								</Icon>
							</IconsBox>

							<ViewBox>
								<BtnView onClick={toggleCommentsVisibility}>
									{commentsVisible ? 'Hide comments' : 'View comments'}
									{commentsVisible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
								</BtnView>
							</ViewBox>

							<BtnSave
								onClick={() => savePost(post.id)}
								disabled={!user || isSaved}
								style={{
									cursor: !user || isSaved ? 'not-allowed' : 'pointer',
								}}
							>
								{!user || isSaved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
							</BtnSave>
						</Activity>

						{isTablet ? (
							<>
								{commentsVisible && (
									<CommentsBox>
										<CommentForm postId={postId} />
										<Scroll>
											<CommentsList postId={postId} />
										</Scroll>
									</CommentsBox>
								)}
							</>
						) : (
							<CommentsBox>
								<Scroll>
									<CommentsList postId={postId} />
								</Scroll>
								<Form>
									<CommentForm postId={postId} />
								</Form>
							</CommentsBox>
						)}
					</Wrap>

					<ReturnBox>
						<ButtonHigh
							onClick={handleBack}
							text={'Back to homepage'}
							style={{
								border: '1px solid var(--color-accent-change)',
								color: 'var(--color-accent-change)',
								backgroundColor: 'transparent',
							}}
						/>
					</ReturnBox>
				</Container>
			)}

			<ModalUnregister isOpen={modalOpenId === post.id} onClose={() => setModalOpenId(null)} />
		</>
	);
};

export default DetailPost;
