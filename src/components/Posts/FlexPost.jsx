import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { usePostsStore } from '../../store/usePostsStore';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';

import Avatar from '../Avatar';
import ButtonSmall from '../Buttons/ButtonSmall';
import MediaCarousel from '../MediaCarousel';
import ModalUnregister from '../Modals/ModalUnregister';

const Flex = styled.div`
	display: flex;
	width: 100%;
	border-radius: 30px;
	background-color: var(--bg-white);
	box-shadow: 0px 4px 16px 0px #2f7bf626;
	overflow: hidden;

	@media (max-width: 767px) {
		display: none;
	}
`;

const FlexLeft = styled.div`
	width: 282px;
	height: 217px;
	flex-shrink: 0;

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
		height: 154px;
	}
`;

const FlexRight = styled.div`
	flex-grow: 1;
	max-width: 100%;
	overflow: hidden;
	padding: 23px 40px 23px 21px;
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 20px;
	}
`;

const FlexHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 11px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 8px;
	}
`;

const FlexNickname = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	cursor: pointer;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
	}
`;

const FlexDate = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 12px;
		line-height: 14.4px;
	}
`;

const FlexCenter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 11px;
	cursor: pointer;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 16px;
	}
`;

const FlexTitle = styled.p`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	cursor: pointer;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const FlexText = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	cursor: pointer;

	@media (min-width: 768px) and (max-width: 1259px) {
		display: none;
	}
`;

const FlexBottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const FlexIcons = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 5px;
	}
`;

const FlexIcon = styled.div`
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

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 3px;
		padding: 4px 6px;

		span {
			font-size: 12px;
			line-height: 14.22px;
		}
	}
`;

const FlexBottomRight = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
`;

const FlexSaved = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-black-change);
`;

const FlexPost = ({ post }) => {
	const navigate = useNavigate();
	const [modalOpenId, setModalOpenId] = useState(null);

	const { liked, likesCount } = usePostsStore((s) => s.likesState[post.id]) || {
		liked: false,
		likesCount: post.likes?.length || 0,
	};
	const isSaved = usePostsStore((s) => s.savedMap[post.id]);
	const handleLike = usePostsStore((s) => s.handleLike);
	const savePost = usePostsStore((s) => s.savePost);
	const author = usePostsStore((s) => s.authors[post.author?.uid]);

	return (
		<Flex>
			<FlexLeft>
				{post.media.length > 1 ? (
					<MediaCarousel media={post.media} />
				) : post.media[0].includes('.mp4') ? (
					<video autoPlay loop muted playsInline>
						<source src={post.media[0]} type="video/mp4" />
						Your browser does not support video.
					</video>
				) : (
					<img src={post.media[0]} alt="Post media" />
				)}
			</FlexLeft>

			<FlexRight>
				<FlexHeader>
					<Avatar
						photo={author?.avatar}
						name={author?.nickname}
						onClick={() => navigate(`/author/${post.author.uid}`)}
						style={{
							width: '32px',
							height: '32px',
							cursor: 'pointer',
						}}
					/>
					<FlexNickname onClick={() => navigate(`/author/${post.author.uid}`)}>
						{author?.nickname || 'Unknown Author'}
					</FlexNickname>
					<FlexDate>{new Date(post.createdAt).toLocaleDateString()}</FlexDate>
				</FlexHeader>

				<FlexCenter onClick={() => navigate(`/post/${post.id}`)}>
					<FlexTitle>{post.title}</FlexTitle>
					<FlexText>{post.text}</FlexText>
				</FlexCenter>

				<FlexBottom>
					<FlexIcons>
						<FlexIcon onClick={() => handleLike(post.id, setModalOpenId)} style={{ cursor: 'pointer' }}>
							{liked ? (
								<FaHeart size={24} style={{ color: 'var(--color-red)' }} />
							) : (
								<FaRegHeart
									size={24}
									style={{
										color: 'var(--color-black-change)',
									}}
								/>
							)}
							<span>{likesCount}</span>
						</FlexIcon>
						<FlexIcon>
							<FiEye size={24} style={{ color: 'var(--color-black-change)' }} />
							<span>{post.views || 0}</span>
						</FlexIcon>
						<FlexIcon>
							<BiComment size={24} style={{ color: 'var(--color-black-change' }} />
							<span>{post.comments?.length || 0}</span>
						</FlexIcon>
					</FlexIcons>
					<FlexBottomRight>
						<FlexSaved
							onClick={() => savePost(post.id)}
							style={{
								cursor: isSaved ? 'not-allowed' : 'pointer',
							}}
						>
							{isSaved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
						</FlexSaved>

						<ButtonSmall text={'Read more'} onClick={() => navigate(`/post/${post.id}`)} />
					</FlexBottomRight>
				</FlexBottom>
			</FlexRight>

			<ModalUnregister isOpen={modalOpenId === post.id} onClose={() => setModalOpenId(null)} />
		</Flex>
	);
};

export default FlexPost;
