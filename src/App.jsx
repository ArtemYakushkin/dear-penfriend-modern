import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthStore } from './store/useAuthStore';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import AuthorPage from './pages/AuthorPage';
import CreatePostPage from './pages/CreatePostPage';
import NotificationsPage from './pages/NotificationsPage';
import Footer from './components/Footer';

const App = () => {
	const init = useAuthStore((state) => state.init);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<Router>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/post/:postId" element={<PostDetailsPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/author/:uid" element={<AuthorPage />} />
				<Route path="/create" element={<CreatePostPage />} />
				<Route path="/notifications" element={<NotificationsPage />} />
			</Routes>

			<Footer />

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
				theme="colored"
			/>
		</Router>
	);
};

export default App;
