import { useEffect } from 'react';
import styled from 'styled-components';

import { useRepliesStore } from '../../store/useRepliesStore';
import InfoBoard from '../InfoBoard';
import Loader from '../Loader';
import CommentReplyItem from './CommentReplyItem';

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	@media (max-width: 767px) {
		gap: 10px;
	}
`;

const CommentReplyList = ({ commentId }) => {
	const { replies, loading, subscribeToReplies } = useRepliesStore();

	useEffect(() => {
		const unsub = subscribeToReplies(commentId);
		return () => unsub();
	}, [commentId, subscribeToReplies]);

	if (loading) return <Loader />;

	if (!replies.length) {
		return <InfoBoard message={'No replies yet'} />;
	}

	return (
		<List>
			{replies.map((reply) => (
				<CommentReplyItem key={reply.id} reply={reply} />
			))}
		</List>
	);
};

export default CommentReplyList;
