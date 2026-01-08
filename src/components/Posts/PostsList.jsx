import styled from 'styled-components';

import Loader from '../Loader';
import GridPost from './GridPost';
import FlexPost from './FlexPost';
import InfoBoard from '../InfoBoard';
import ButtonHigh from '../Buttons/ButtonHigh';

import { Container } from '../../style/Container';

const Wrap = styled.div`
	padding-bottom: 120px;
`;

const PostsContainer = styled.div`
	&.posts-grid {
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
	}

	&.posts-flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;

		@media (min-width: 768px) and (max-width: 1259px) {
			gap: 20px;
		}
	}
`;

const PostsMoreBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 50px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 40px;
	}

	@media (max-width: 767px) {
		margin-top: 40px;
	}
`;

const PostsList = ({ posts, isLoading, viewMode, onSeeMore, showSeeMore }) => {
	return (
		<Container>
			<Wrap>
				{isLoading ? (
					<Loader />
				) : posts.length > 0 ? (
					<PostsContainer className={viewMode === 'grid' ? 'posts-grid' : 'posts-flex'}>
						{posts.map((post) =>
							viewMode === 'grid' ? (
								<GridPost key={post.id} post={post} />
							) : (
								<FlexPost key={post.id} post={post} />
							),
						)}
					</PostsContainer>
				) : (
					<InfoBoard message="No posts found" />
				)}

				{!isLoading && posts.length > 0 && showSeeMore && (
					<PostsMoreBox>
						<ButtonHigh onClick={onSeeMore} text="See more" />
					</PostsMoreBox>
				)}
			</Wrap>
		</Container>
	);
};

export default PostsList;
