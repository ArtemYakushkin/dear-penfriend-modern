import { toast } from 'react-toastify';
import { isEnglishOnly } from '../utils/validation';
import { createComment } from '../api/commentsApi';
import { notifyPostAuthorAboutComment } from '../api/notificationsCommentsApi';

export const submitComment = async ({
	text,
	user,
	postId,
	onSuccess,
	setError,
}) => {
	setError('');

	if (!text.trim()) {
		setError('Comment cannot be empty.');
		return;
	}

	if (!isEnglishOnly(text)) {
		setError('Comment must contain only English letters and emojis.');
		return;
	}

	try {
		const commentId = await createComment({ postId, text, user });

		await notifyPostAuthorAboutComment({
			postId,
			commentId,
			sender: {
				id: user.uid,
				nickname: user.displayName,
				photoURL: user.photoURL,
			},
		});

		toast.success('Comment added successfully!');
		onSuccess?.();
	} catch (e) {
		console.error(e);
		setError('Error sending comment');
	}
};
