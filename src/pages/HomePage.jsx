import { useEffect } from 'react';

import { usePostsStore } from '../store/usePostsStore';

import Hero from '../components/Hero';
import ToolbarMain from '../components/ToolbarMain';
import PostsList from '../components/Posts/PostsList';
import AboutProject from '../components/AboutProject';
import ShareBlok from '../components/ShareBlok';

const HomePage = () => {
	const { init, filteredPosts, isLoading, viewMode, visibleCount, seeMore, search, sort, toggleViewMode } =
		usePostsStore();

	useEffect(() => {
		init();
	}, [init]);

	const currentPosts = filteredPosts.slice(0, visibleCount);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Hero />

			<ToolbarMain onSearch={search} onSort={sort} viewMode={viewMode} setViewMode={toggleViewMode} />

			<PostsList
				posts={currentPosts}
				isLoading={isLoading}
				viewMode={viewMode}
				onSeeMore={seeMore}
				showSeeMore={visibleCount < filteredPosts.length}
			/>

			<AboutProject />

			<ShareBlok />
		</>
	);
};

export default HomePage;
