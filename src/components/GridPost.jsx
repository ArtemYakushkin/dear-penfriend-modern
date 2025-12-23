import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePostsStore } from '../store/usePostsStore';
import { useResponsive } from '../hooks/useResponsive';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';

import Avatar from './Avatar';
import MediaCarousel from './MediaCarousel';
import ModalUnregister from './ModalUnregister';
import {
	Grid,
	GridHeader,
	GridNickname,
	GridDate,
	GridContent,
	GridImage,
	GridBoxText,
	GridTitle,
	GridText,
	GridMore,
	GridBottom,
	GridLine,
	GridFooter,
	GridIconBox,
	GridIcon,
	GridSaved,
} from '../style/GridStyles';

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
