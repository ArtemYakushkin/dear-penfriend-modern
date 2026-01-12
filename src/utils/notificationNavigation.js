export const getNotificationRoute = (notification) => {
	switch (notification.type) {
		case 'new_post':
			return `/post/${notification.postId}`;

		case 'new_comment':
			return `/post/${notification.postId}#comment-${notification.commentId}`;

		case 'new_reply':
			return `/post/${notification.postId}#reply-${notification.replyId}`;

		case 'new_message':
			return '/profile';

		case 'reply_to_message':
			return `/author/${notification.sender.uid}`;

		default:
			return '/';
	}
};
