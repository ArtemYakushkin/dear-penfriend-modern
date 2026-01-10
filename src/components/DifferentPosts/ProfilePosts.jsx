import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUserPostsData } from '../../api/profilePostsApi';
import { filterAndSortPosts } from '../../utils/profilePostsSort';
import { useAuthStore } from '../../store/useAuthStore';

import ToolbarProfilePost from '../Toolbars/ToolbarProfilePost';
import Loader from '../Loader';
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
	GridBottom,
	GridLine,
	GridFooter,
	GridIconBox,
	GridIcon,
} from '../../style/GridStyles';
import { FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';

const Wrap = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 26px;
	}

	@media (max-width: 767px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 20px;
	}
`;

const ProfilePosts = () => {
	const { user } = useAuthStore();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState('New');
	const options = ['New', 'Comment', 'Like'];

	useEffect(() => {
		if (!user) return;
		setLoading(true);
		fetchUserPostsData(user.uid)
			.then(setPosts)
			.catch((err) => console.error('Error loading posts:', err))
			.finally(() => setLoading(false));
	}, [user]);

	const handleSearchChange = (query) => setSearchQuery(query);

	const handleSortChange = (option) => setSortOption(option);

	const filteredPosts = useMemo(
		() => filterAndSortPosts(posts, searchQuery, sortOption),
		[posts, searchQuery, sortOption],
	);

	return (
		<>
			<ToolbarProfilePost
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onSearchChange={handleSearchChange}
				selectedOption={sortOption}
				onSortChange={handleSortChange}
				options={options}
			/>

			<Container>
				{loading ? (
					<Loader />
				) : (
					<Wrap>
						{filteredPosts.map((post) => (
							<Link to={`/post/${post.id}`} key={post.id}>
								<Grid style={{ height: '580px' }}>
									<GridHeader>
										<GridDate>{new Date(post.createdAt).toLocaleDateString()}</GridDate>
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

									<GridBottom>
										<GridLine>
											<div></div>
										</GridLine>

										<GridFooter>
											<GridIconBox>
												<GridIcon>
													<FaRegHeart
														size={24}
														style={{ color: 'var(--color-black-change)' }}
													/>
													<span>{post.likes?.length || 0}</span>
												</GridIcon>
												<GridIcon>
													<FiEye size={24} style={{ color: 'var(--color-black-change)' }} />
													<span>{post.views}</span>
												</GridIcon>
												<GridIcon>
													<BiComment
														size={24}
														style={{ color: 'var(--color-black-change)' }}
													/>
													<span>{post.comments?.length || 0}</span>
												</GridIcon>
											</GridIconBox>
										</GridFooter>
									</GridBottom>
								</Grid>
							</Link>
						))}
					</Wrap>
				)}
			</Container>
		</>
	);
};

export default ProfilePosts;
