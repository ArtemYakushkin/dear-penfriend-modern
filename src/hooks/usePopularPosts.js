import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { fetchPopularPosts, fetchAuthors } from '../utils/popularPostsUtils';

export const usePopularPosts = () => {
	const [posts, setPosts] = useState([]);
	const [authors, setAuthors] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const { posts, error } = await fetchPopularPosts(db);
				if (error) return setError(true);

				setPosts(posts);

				const authorsData = await fetchAuthors(db, posts);
				setAuthors(authorsData);
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	return { posts, authors, loading, error };
};
