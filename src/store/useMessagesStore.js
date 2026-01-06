import { create } from 'zustand';
import { sendMessage, deleteMessage, updateMessage, uploadMessageImage, fetchAuthorNickname } from '../api/messagesApi';
import { isEnglishOnly } from '../utils/validation';

export const useMessagesStore = create((set, get) => ({
	text: '',
	image: null,
	imageFile: null,
	gif: null,
	error: '',
	authorNickname: '',

	setText: (text) => set({ text }),
	setGif: (gif) => set({ gif }),
	setImagePreview: (image) => set({ image }),
	clearForm: () =>
		set({
			text: '',
			image: null,
			imageFile: null,
			gif: null,
			error: '',
		}),

	loadAuthorNickname: async (authorId) => {
		const nickname = await fetchAuthorNickname(authorId);
		set({ authorNickname: nickname });
	},

	send: async ({ authorId, user }) => {
		const { text, imageFile, gif } = get();

		if (!text.trim() && !imageFile && !gif) {
			set({ error: "You can't send an empty message." });
			return;
		}

		if (text.trim() && !isEnglishOnly(text)) {
			set({ error: 'Only English characters allowed.' });
			return;
		}

		let imageURL = null;
		if (imageFile) {
			imageURL = await uploadMessageImage(imageFile, user.uid);
		}

		await sendMessage({
			authorId,
			user,
			text,
			image: imageURL,
			gif,
		});

		get().clearForm();
	},
}));
