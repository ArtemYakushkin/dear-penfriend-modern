import { useEffect } from 'react';
import styled from 'styled-components';
import { useCommentsStore } from '../../store/useCommentsStore';
import Loader from '../Loader';
import InfoBoard from '../InfoBoard';
import CommentItem from './CommentItem';

const List = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 30px;
	margin-left: 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 20px;
		margin-left: 0px;
	}

	@media (max-width: 767px) {
		gap: 20px;
		margin-left: 0px;
	}
`;

const CommentsList = ({ postId }) => {
	const { comments, loading, subscribeToComments } = useCommentsStore();

	useEffect(() => {
		const unsub = subscribeToComments(postId);
		return () => unsub();
	}, [postId, subscribeToComments]);

	if (loading) return <Loader />;

	if (!comments.length) {
		return <InfoBoard message={'There are no comments yet'} />;
	}

	return (
		<List>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} postId={postId} />
			))}
		</List>
	);
};

export default CommentsList;
