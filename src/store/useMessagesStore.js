import { create } from 'zustand';
import { sendMessageToDB, subscribeToMessages, deleteMessageFromDB, updateMessageInDB } from '../api/messagesApi';

import { uploadImage, sendNotification } from '../utils/messageFormUtils';

export const useMessagesStore = create((set) => ({
	messages: [],
	loading: false,
	error: null,

	/* ================= SUBSCRIBE ================= */
	subscribe: (authorId) => {
		return subscribeToMessages(authorId, (messages) => {
			set({ messages });
		});
	},

	/* ================= SEND ================= */
	sendMessage: async ({ authorId, user, text, imageFile, gif }) => {
		set({ loading: true, error: null });

		try {
			let imageUrl = null;
			if (imageFile) {
				imageUrl = await uploadImage(imageFile, user.uid);
			}

			await sendMessageToDB({
				authorId,
				senderId: user.uid,
				senderNickname: user.displayName,
				senderAvatar: user.photoURL,
				message: text,
				image: imageUrl,
				gif,
			});

			await sendNotification(authorId, user);

			set({ loading: false });
		} catch (error) {
			console.error(error);
			set({ loading: false, error: 'Failed to send message' });
			throw error;
		}
	},

	/* ================= DELETE ================= */
	deleteMessage: async (messageId) => {
		try {
			await deleteMessageFromDB(messageId);
		} catch (error) {
			console.error('Delete error:', error);
			throw error;
		}
	},

	/* ================= UPDATE ================= */
	updateMessage: async (messageId, newText) => {
		if (!newText.trim()) return;

		try {
			await updateMessageInDB(messageId, newText);
		} catch (error) {
			console.error('Update error:', error);
			throw error;
		}
	},
}));
