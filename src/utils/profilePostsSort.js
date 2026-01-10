export const filterAndSortPosts = (posts, query, sortOption) => {
	return posts
		.filter(
			(post) =>
				post.title.toLowerCase().includes(query.toLowerCase()) ||
				post.text.toLowerCase().includes(query.toLowerCase()),
		)
		.sort((a, b) => {
			if (sortOption === 'New') {
				return new Date(b.createdAt) - new Date(a.createdAt);
			} else if (sortOption === 'Comment') {
				return (b.comments?.length || 0) - (a.comments?.length || 0);
			} else if (sortOption === 'Like') {
				return (b.likes?.length || 0) - (a.likes?.length || 0);
			}
			return 0;
		});
};
