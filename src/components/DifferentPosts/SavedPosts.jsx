import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useResponsive } from '../../hooks/useResponsive';
import { useAuthStore } from '../../store/useAuthStore';
import { displaySavedPosts, removeSavedPost } from '../../api/savedPosts';

import Loader from '../Loader';
import InfoBoard from '../InfoBoard';
import Avatar from '../Avatar';
import { Container } from '../../style/Container';
import {
	Grid,
	GridHeader,
	GridDate,
	GridContent,
	GridImage,
	GridBoxText,
	GridTitle,
	GridText,
	GridNickname,
	GridBtnDel,
} from '../../style/GridStyles';

const Wrap = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 24px;
	row-gap: 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 26px;
	}

	@media (max-width: 767px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 20px;
	}
`;

const SavedPosts = () => {
	const { user } = useAuthStore();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const { isMobile, isTablet } = useResponsive();

	useEffect(() => {
		if (!user) {
			setLoading(false);
			return;
		}
		displaySavedPosts(user.uid)
			.then(setPosts)
			.catch((err) => console.error('Error fetching posts:', err))
			.finally(() => setLoading(false));
	}, [user]);

	return (
		<>
			{loading ? (
				<Loader />
			) : posts.length === 0 ? (
				<InfoBoard message={'You do not have any saved posts yet.'} />
			) : (
				<Container>
					<Wrap>
						{posts.map((post) => (
							<Grid style={{ height: isTablet || isMobile ? '445px' : '540px' }} key={post.id}>
								<Link to={`/post/${post.id}`}>
									<GridHeader>
										<Avatar
											photo={post.author.avatar}
											name={post.author.nickname}
											style={{
												width: isMobile ? '40px' : isTablet ? '40px' : '63px',
												height: isMobile ? '40px' : isTablet ? '40px' : '63px',
												marginRight: isMobile ? '6px' : isTablet ? '6px' : '15px',
												cursor: 'pointer',
											}}
										/>
										<div>
											<GridNickname>{post.author.nickname}</GridNickname>
											<GridDate>{new Date(post.createdAt).toLocaleDateString()}</GridDate>
										</div>
									</GridHeader>

									<GridContent>
										<GridImage>
											{post.media &&
												post.media.length > 0 &&
												(post.media[0].includes('.mp4') ? (
													<video src={post.media[0]} autoPlay muted loop playsInline />
												) : (
													<img src={post.media[0]} alt="Post media" />
												))}
										</GridImage>
										<GridBoxText>
											<GridTitle>{post.title}</GridTitle>
											<GridText>{post.text}</GridText>
										</GridBoxText>
									</GridContent>
								</Link>

								<GridBtnDel
									onClick={() => removeSavedPost(user.uid, post.id, setPosts)}
									title="Remove from saved"
								>
									Delete post
								</GridBtnDel>
							</Grid>
						))}
					</Wrap>
				</Container>
			)}
		</>
	);
};

export default SavedPosts;
