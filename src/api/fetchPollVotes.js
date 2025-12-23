import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchPollVotes = async ({
	postId,
	answersLength,
	setPollVotes,
}) => {
	const postRef = doc(db, 'posts', postId);
	const postSnapshot = await getDoc(postRef);

	if (postSnapshot.exists()) {
		const postData = postSnapshot.data();
		setPollVotes(postData.pollVotes || new Array(answersLength).fill(0));
	}
};
