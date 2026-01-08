import { create } from 'zustand';
import { fetchAuthorData } from '../api/authorApi';

export const useAuthorsStore = create((set, get) => ({
	authors: {},

	fetchAuthor: async (uid) => {
		const { authors } = get();
		if (authors[uid]) return;

		try {
			const data = await fetchAuthorData(uid);
			set((state) => ({
				authors: { ...state.authors, [uid]: data || { nickname: 'Unknown', avatar: '' } },
			}));
		} catch (err) {
			console.error('Failed to fetch author', err);
			set((state) => ({
				authors: { ...state.authors, [uid]: { nickname: 'Unknown', avatar: '' } },
			}));
		}
	},
}));
