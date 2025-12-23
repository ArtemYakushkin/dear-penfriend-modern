import { toast } from 'react-toastify';
import { isEnglishOnly } from './validation';
import { createReply } from '../api/repliesApi';
import { notifyCommentAuthorAboutReply } from '../api/notificationsRepliesApi';

export const submitReply = async ({
	text,
	user,
	postId,
	commentId,
	setError,
	onSuccess,
}) => {
	setError('');

	if (!text.trim()) {
		setError('Reply cannot be empty.');
		return;
	}

	if (!isEnglishOnly(text)) {
		setError('Reply must contain only English letters and emojis.');
		return;
	}

	try {
		const replyId = await createReply({
			postId,
			commentId,
			text,
			user,
		});

		await notifyCommentAuthorAboutReply({
			postId,
			commentId,
			replyId,
			sender: {
				id: user.uid,
				nickname: user.displayName,
				photoURL: user.photoURL,
			},
		});

		toast.success('Reply added successfully!');
		onSuccess?.();
	} catch (e) {
		console.error(e);
		setError('Error sending reply');
	}
};
