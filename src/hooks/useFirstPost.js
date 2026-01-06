import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

export const useFirstPost = () => {
	const [firstPostId, setFirstPostId] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchFirstPost = async () => {
			try {
				const postsRef = collection(db, 'posts');
				const q = query(
					postsRef,
					orderBy('createdAt', 'asc'),
					limit(1),
				);
				const querySnapshot = await getDocs(q);

				if (!querySnapshot.empty) {
					setFirstPostId(querySnapshot.docs[0].id);
				}
			} catch (error) {
				console.error('Error retrieving first post:', error);
			}
		};

		fetchFirstPost();
	}, []);

	const handleFirstPostClick = () => {
		if (firstPostId) {
			navigate(`/post/${firstPostId}`);
		}
	};

	return { handleFirstPostClick };
};
