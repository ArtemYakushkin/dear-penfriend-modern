import { create } from 'zustand';
import {
	uploadReplyImage,
	sendReplyApi,
	sendReplyNotificationApi,
	subscribeRepliesApi,
	editReplyApi,
	deleteReplyApi,
} from '../api/messageRepliesApi';

export const useMessageRepliesStore = create((set) => ({
	replies: [],
	unsubscribe: null,

	subscribe: (messageId) => {
		const unsubscribe = subscribeRepliesApi(messageId, (replies) => set({ replies }));
		set({ unsubscribe });
	},

	cleanup: () => {
		set((s) => {
			s.unsubscribe?.();
			return { replies: [], unsubscribe: null };
		});
	},

	sendReply: async ({ replyToMessage, currentUser, text, imageFile, gif }) => {
		let imageUrl = null;

		if (imageFile) {
			imageUrl = await uploadReplyImage(imageFile);
		}

		await sendReplyApi({
			replyToMessage,
			currentUser,
			text,
			image: imageUrl,
			gif,
		});

		await sendReplyNotificationApi(replyToMessage.senderId, currentUser);
	},

	editReply: (id, text) => editReplyApi(id, text),
	deleteReply: (id) => deleteReplyApi(id),
}));
