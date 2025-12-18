import { create } from 'zustand';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

import { db } from '../firebase';
import { loadAuthors } from '../api/loadAuthorService';
import { handleLikePost } from '../api/likePostService';
import { fetchSavedPosts, savePostApi } from '../api/savedPosts';

export const usePostsStore = create((set, get) => ({
	posts: [],
	filteredPosts: [],
	authors: {},
	likesState: {},
	savedMap: {},
	isLoading: true,
	viewMode: localStorage.getItem('viewMode') || 'grid',
	visibleCount: Number(localStorage.getItem('visibleCount')) || 6,
	postsPerPage: 6,

	// ===================== INIT POSTS =====================
	init: async () => {
		set({ isLoading: true });
		try {
			const q = query(
				collection(db, 'posts'),
				orderBy('createdAt', 'desc'),
			);
			const snap = await getDocs(q);
			const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

			const authors = await loadAuthors(posts, {});

			set({
				posts,
				filteredPosts: posts,
				authors,
				isLoading: false,
				visibleCount: 6,
			});

			// После загрузки постов, инициируем лайки и сохранённые посты
			get().initUserState();
		} catch (e) {
			console.error('Error fetching posts', e);
			set({ isLoading: false });
		}
	},

	// ===================== INIT USER STATE (LIKES + SAVED) =====================
	initUserState: () => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			const { posts } = get();
			if (!posts.length) return;

			const likesState = {};
			posts.forEach((post) => {
				likesState[post.id] = {
					liked: user ? post.likes?.includes(user.uid) : false,
					likesCount: post.likes?.length || 0,
				};
			});

			let savedMap = {};
			if (user) {
				try {
					const saved = await fetchSavedPosts(user.uid);
					saved.forEach((id) => {
						savedMap[id] = true;
					});
				} catch (e) {
					console.error('Error loading saved posts', e);
				}
			}

			set({ likesState, savedMap });
		});
	},

	// ===================== LIKE =====================
	handleLike: async (postId, setModalOpenId) => {
		const user = getAuth().currentUser;

		await handleLikePost({
			postId,
			user,
			setLikesState: (updateFn) =>
				set((state) => ({
					likesState: updateFn(state.likesState),
				})),
			setModalOpenId,
		});
	},

	// ===================== SAVE =====================
	savePost: async (postId) => {
		const user = getAuth().currentUser;

		if (!user) {
			toast.info('You must be registered to save posts.');
			return;
		}

		const { savedMap } = get();
		if (savedMap[postId]) return;

		try {
			await savePostApi(user.uid, postId);
			set({
				savedMap: {
					...savedMap,
					[postId]: true,
				},
			});
		} catch (e) {
			toast.error('Failed to save post');
		}
	},

	// ===================== UI ACTIONS =====================
	search: (queryStr) => {
		const q = queryStr.toLowerCase();
		const filtered = get().posts.filter((p) =>
			p.title?.toLowerCase().includes(q),
		);
		set({ filteredPosts: filtered, visibleCount: 6 });
	},

	sort: (option) => {
		const sorted = [...get().filteredPosts];

		if (option === 'Comment') {
			sorted.sort(
				(a, b) => (b.comments?.length || 0) - (a.comments?.length || 0),
			);
		} else if (option === 'Like') {
			sorted.sort(
				(a, b) => (b.likes?.length || 0) - (a.likes?.length || 0),
			);
		} else if (option === 'New') {
			sorted.sort(
				(a, b) =>
					(b.createdAt?.toMillis?.() ||
						Date.parse(b.createdAt) ||
						0) -
					(a.createdAt?.toMillis?.() || Date.parse(a.createdAt) || 0),
			);
		}

		set({ filteredPosts: sorted, visibleCount: 6 });
	},

	seeMore: () => {
		set((s) => ({ visibleCount: s.visibleCount + s.postsPerPage }));
	},

	toggleViewMode: (mode) => {
		localStorage.setItem('viewMode', mode);
		set({ viewMode: mode });
	},
}));
