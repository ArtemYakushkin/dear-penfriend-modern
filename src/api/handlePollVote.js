import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export const handlePollVote = async ({
	index,
	user,
	selectedAnswer,
	pollVotes,
	postId,
	pollKey,
	setSelectedAnswer,
	setPollVotes,
	setIsModalOpen,
}) => {
	if (!user) {
		setIsModalOpen(true);
		return;
	}

	if (selectedAnswer !== null) return;

	try {
		const updatedVotes = [...pollVotes];
		updatedVotes[index] += 1;

		const postRef = doc(db, 'posts', postId);
		await updateDoc(postRef, {
			pollVotes: updatedVotes,
			lastVoteTime: serverTimestamp(),
		});

		setSelectedAnswer(index);
		setPollVotes(updatedVotes);

		localStorage.setItem(
			pollKey,
			JSON.stringify({ selectedAnswer: index }),
		);

		toast.success('Your vote has been recorded!');
	} catch (error) {
		console.error('Error updating vote count:', error);
		toast.error('Failed to record your vote.');
	}
};
