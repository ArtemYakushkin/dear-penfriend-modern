import { create } from 'zustand';
import { fetchAuthorData, subscribeToUserPostCount } from '../api/authorApi';

export const useAuthorsStore = create((set, get) => ({
	authors: {},
	postCountUnsubs: {},

	fetchAuthor: async (uid) => {
		const { authors, postCountUnsubs } = get();

		if (authors[uid]) return;

		try {
			const data = await fetchAuthorData(uid);

			set((state) => ({
				authors: {
					...state.authors,
					[uid]: {
						...data,
						postCount: 0,
					},
				},
			}));

			if (!postCountUnsubs[uid]) {
				const unsub = subscribeToUserPostCount(uid, (count) => {
					set((state) => ({
						authors: {
							...state.authors,
							[uid]: {
								...state.authors[uid],
								postCount: count,
							},
						},
					}));
				});

				set((state) => ({
					postCountUnsubs: {
						...state.postCountUnsubs,
						[uid]: unsub,
					},
				}));
			}
		} catch (err) {
			console.error('Failed to fetch author', err);

			set((state) => ({
				authors: {
					...state.authors,
					[uid]: { nickname: 'Unknown', avatar: '', postCount: 0 },
				},
			}));
		}
	},

	unsubscribeAuthor: (uid) => {
		const { postCountUnsubs } = get();
		if (postCountUnsubs[uid]) {
			postCountUnsubs[uid]();
			set((state) => {
				const copy = { ...state.postCountUnsubs };
				delete copy[uid];
				return { postCountUnsubs: copy };
			});
		}
	},
}));
