import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthorsStore } from '../store/useAuthorsStore';
import { fetchAuthorPosts } from '../api/authorApi';
import { stripHtml } from '../utils/textUtils';
import { useAuthStore } from '../store/useAuthStore';
import Loader from '../components/Loader';
import CardProfile from '../components/CardProfile/CardProfile';
import TabsAuthor from '../components/Tabs/TabsAuthor';
import AboutAuthor from '../components/AboutAuthor';
import AuthorPosts from '../components/DifferentPosts/AuthorPosts';
import PopularPosts from '../components/DifferentPosts/PopularPosts';

const ProfileWrap = styled.div`
	padding-bottom: 120px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding-bottom: 90px;
	}

	@media (max-width: 767px) {
		margin-top: 81px;
		padding-bottom: 90px;
	}
`;

const AuthorPage = () => {
	const user = useAuthStore((state) => state.user);
	const { uid } = useParams();
	const { authors, fetchAuthor } = useAuthorsStore();
	const author = authors[uid];
	const [posts, setPosts] = useState([]);
	const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'about');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (uid) fetchAuthor(uid);
	}, [uid, fetchAuthor]);

	useEffect(() => {
		if (author?.createdPosts) {
			fetchAuthorPosts(author.createdPosts).then(setPosts);
		}
	}, [author]);

	if (user && user.uid === uid) {
		return <Navigate to="/profile" replace />;
	}

	if (!author) return <Loader />;

	return (
		<>
			<ProfileWrap>
				<CardProfile
					avatar={author.avatar}
					cover={author.cover}
					nickname={author.nickname}
					country={author.country}
					profession={author.profession}
					facebookLink={author.facebook}
					instagramLink={author.instagram}
					telegramLink={author.telegram}
					showSettings={false}
				/>

				<TabsAuthor activeTab={activeTab} setActiveTab={setActiveTab} author={author} />

				<>
					{activeTab === 'about' && (
						<AboutAuthor stripHtml={stripHtml} author={author} authorId={uid} showReplyForm={false} />
					)}

					{activeTab === 'posts' && <AuthorPosts posts={posts} author={author} />}
				</>
			</ProfileWrap>

			<PopularPosts />
		</>
	);
};

export default AuthorPage;
