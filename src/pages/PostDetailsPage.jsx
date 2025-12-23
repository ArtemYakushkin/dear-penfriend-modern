import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { usePostsStore } from '../store/usePostsStore';
import { useAuthStore } from '../store/useAuthStore';

import DetailPost from '../components/DetailPost';
import PopularPosts from '../components/PopularPosts';
import ShareBlok from '../components/ShareBlok';
import InfoBoard from '../components/InfoBoard';
import Loader from '../components/Loader';

const Details = styled.div`
	margin-top: 10px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 0px;
	}

	@media (max-width: 767px) {
		margin-top: 81px;
	}
`;

const PostDetailsPage = () => {
	const { postId } = useParams();

	const posts = usePostsStore((s) => s.posts);
	const getPostById = usePostsStore((s) => s.getPostById);
	const loadAuthorById = usePostsStore((s) => s.loadAuthorById);
	const authors = usePostsStore((s) => s.authors);

	const user = useAuthStore((s) => s.user);

	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		let active = true;

		const loadPost = async () => {
			const fromStore = posts.find((p) => p.id === postId);

			if (fromStore) {
				if (active) {
					setPost(fromStore);
					setLoading(false);
				}
				return;
			}

			const fetched = await getPostById(postId);
			if (active) {
				setPost(fetched);
				setLoading(false);
			}
		};

		loadPost();

		return () => {
			active = false;
		};
	}, [postId, posts, getPostById]);

	useEffect(() => {
		if (!post?.author?.uid) return;

		if (!authors[post.author.uid]) {
			loadAuthorById(post.author.uid);
		}
	}, [post, authors, loadAuthorById]);

	if (loading) return <Loader />;

	if (!post) {
		return (
			<InfoBoard
				message="Post not found"
				style={{
					borderLeft: '7px solid var(--color-red)',
					color: 'var(--color-red)',
					marginBottom: '20px',
				}}
			/>
		);
	}

	const author = authors[post.author.uid];

	if (!author) return <Loader />;

	return (
		<Details>
			<DetailPost
				post={post}
				postId={postId}
				user={user}
				author={author}
			/>

			<PopularPosts />

			<ShareBlok />
		</Details>
	);
};

export default PostDetailsPage;
