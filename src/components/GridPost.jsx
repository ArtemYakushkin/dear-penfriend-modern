import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { usePostsStore } from '../store/usePostsStore';
import { useResponsive } from '../hooks/useResponsive';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';

import Avatar from './Avatar';
import MediaCarousel from './MediaCarousel';
import ModalUnregister from './ModalUnregister';

const Grid = styled.div`
	width: 100%;
	height: 645px;
	padding: 20px 0 20px 0;
	border-radius: 30px;
	background-color: var(--bg-white);
	box-shadow: var(--register-shadow);
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 100%;
		height: 540px;
		padding: 20px 0 20px 0;
	}

	@media (max-width: 767px) {
		width: 100%;
		height: 540px;
		padding: 20px 0 20px 0;
	}
`;

const GridHeader = styled.div`
	padding: 0 20px 0 20px;
	margin-bottom: 22px;
	display: flex;
	align-items: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 21px;
	}

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

const GridNickname = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
	}
`;

const GridDate = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 12px;
		line-height: 14.4px;
	}

	@media (max-width: 767px) {
		font-size: 12px;
		line-height: 14.4px;
	}
`;

const GridContent = styled.div`
	cursor: pointer;
`;

const GridImage = styled.div`
	width: 100%;
	height: 216px;
	margin-bottom: 22px;

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
		height: 184px;
		margin-bottom: 20px;
	}

	@media (max-width: 767px) {
		height: 184px;
		margin-bottom: 20px;
	}
`;

const GridBoxText = styled.div`
	padding: 0 20px 0 20px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 0;
	}

	@media (max-width: 767px) {
		margin-bottom: 0;
	}
`;

const GridTitle = styled.p`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	margin-bottom: 10px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const GridText = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	max-width: 100%;
	cursor: pointer;
	margin-bottom: 4px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
		margin-bottom: 2px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
		margin-bottom: 2px;
	}
`;

const GridMore = styled.div`
	width: 100%;
	display: flex;
	justify-content: end;

	span {
		position: relative;
		font-weight: 400;
		font-size: 18px;
		line-height: 28.8px;
		color: var(--color-accent);
		cursor: pointer;

		&::after {
			content: '';
			position: absolute;
			bottom: 4px;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: var(--color-accent);
		}
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		span {
			font-size: 16px;
			line-height: 25.6px;
		}
	}

	@media (max-width: 767px) {
		span {
			font-size: 16px;
			line-height: 25.6px;
		}
	}
`;

const GridBottom = styled.div`
	margin-top: auto;
`;

const GridLine = styled.div`
	padding: 0 20px 0 20px;
	margin-bottom: 30px;

	div {
		width: 100%;
		height: 1px;
		background-color: var(--color-grey-light);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 22px;
	}

	@media (max-width: 767px) {
		margin-bottom: 22px;
	}
`;

const GridFooter = styled.div`
	padding: 0 20px 0 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const GridIconBox = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const GridIcon = styled.div`
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
`;

const GridSaved = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-black-change);
`;

const GridPost = ({ post }) => {
	const navigate = useNavigate();
	const { isMobile, isTablet } = useResponsive();
	const [modalOpenId, setModalOpenId] = useState(null);

	const { liked, likesCount } = usePostsStore(
		(s) => s.likesState[post.id],
	) || {
		liked: false,
		likesCount: post.likes?.length || 0,
	};
	const isSaved = usePostsStore((s) => s.savedMap[post.id]);
	const handleLike = usePostsStore((s) => s.handleLike);
	const savePost = usePostsStore((s) => s.savePost);
	const author = usePostsStore((s) => s.authors[post.author?.uid]);

	return (
		<Grid>
			<GridHeader>
				<Avatar
					photo={author?.avatar}
					name={author?.nickname}
					onClick={() => navigate(`/author/${post.author.uid}`)}
					style={{
						width: isMobile ? '40px' : isTablet ? '40px' : '63px',
						height: isMobile ? '40px' : isTablet ? '40px' : '63px',
						marginRight: isMobile
							? '6px'
							: isTablet
							? '6px'
							: '15px',
						cursor: 'pointer',
					}}
				/>
				<div className="grid-info-post">
					<GridNickname
						onClick={() => navigate(`/author/${post.author.uid}`)}
						style={{ cursor: 'pointer' }}
					>
						{author?.nickname || 'Unknown Author'}
					</GridNickname>
					<GridDate>
						{new Date(post.createdAt).toLocaleDateString()}
					</GridDate>
				</div>
			</GridHeader>

			<GridContent>
				<GridImage>
					{post.media.length > 1 ? (
						<MediaCarousel media={post.media} />
					) : Array.isArray(post.media) &&
					  post.media[0]?.includes('.mp4') ? (
						<video autoPlay loop muted playsInline>
							<source src={post.media[0]} type="video/mp4" />
							Your browser does not support video.
						</video>
					) : (
						<img src={post.media[0]} alt="Post media" />
					)}
				</GridImage>
				<GridBoxText onClick={() => navigate(`/post/${post.id}`)}>
					<GridTitle>{post.title}</GridTitle>
					<GridText>{post.text}</GridText>
					<GridMore>
						<span>More</span>
					</GridMore>
				</GridBoxText>
			</GridContent>

			<GridBottom>
				<GridLine>
					<div></div>
				</GridLine>

				<GridFooter>
					<GridIconBox>
						<GridIcon
							onClick={() => handleLike(post.id, setModalOpenId)}
							style={{ cursor: 'pointer' }}
						>
							{liked ? (
								<FaHeart
									size={24}
									style={{ color: 'var(--color-red)' }}
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
						</GridIcon>
						<GridIcon>
							<FiEye
								size={24}
								style={{ color: 'var(--color-black-change)' }}
							/>
							<span>{post.views || 0}</span>
						</GridIcon>
						<GridIcon>
							<BiComment
								size={24}
								style={{ color: 'var(--color-black-change)' }}
							/>
							<span>{post.comments?.length || 0}</span>
						</GridIcon>
					</GridIconBox>

					<GridSaved
						onClick={() => savePost(post.id)}
						style={{
							cursor: isSaved ? 'not-allowed' : 'pointer',
						}}
					>
						{isSaved ? (
							<FaBookmark size={24} />
						) : (
							<FaRegBookmark size={24} />
						)}
					</GridSaved>
				</GridFooter>
			</GridBottom>

			<ModalUnregister
				isOpen={modalOpenId === post.id}
				onClose={() => setModalOpenId(null)}
			/>
		</Grid>
	);
};

export default GridPost;
