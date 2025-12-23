import { useNavigate } from 'react-router-dom';
import { usePopularPosts } from '../hooks/usePopularPosts';
import styled from 'styled-components';

import Loader from './Loader';
import InfoBoard from './InfoBoard';
import PopularSlider from './PopularSlider';
import { Container } from '../style/Container';

const Popular = styled.section`
	padding: 120px 0;
	background-color: var(--bg-mode);

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 90px 0px 90px 0px;
	}

	@media (max-width: 767px) {
		padding: 90px 0px 90px 0px;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
	margin-bottom: 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 40px;
		line-height: 46px;
		margin-bottom: 30px;
		text-align: center;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
		margin-bottom: 30px;
		text-align: center;
	}
`;

const PopularPosts = () => {
	const navigate = useNavigate();
	const { posts, authors, loading, error } = usePopularPosts();

	return (
		<Popular>
			<Container>
				<Title>Topics you may like</Title>

				{loading && <Loader />}

				{error && (
					<InfoBoard
						message="Popular posts not found."
						style={{
							borderLeft: '7px solid var(--color-red)',
							color: 'var(--color-red)',
						}}
					/>
				)}

				{!loading && !error && (
					<PopularSlider
						posts={posts}
						authors={authors}
						onPostClick={(id) => {
							window.scrollTo({ top: 0, behavior: 'smooth' });
							navigate(`/post/${id}`);
						}}
					/>
				)}
			</Container>
		</Popular>
	);
};

export default PopularPosts;
