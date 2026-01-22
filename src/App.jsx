import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { useAuthStore } from './store/useAuthStore';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import AuthorPage from './pages/AuthorPage';
import CreatePostPage from './pages/CreatePostPage';
import NotificationsPage from './pages/NotificationsPage';
import EditPostPage from './pages/EditPostPage';
import PrivacyPage from './pages/PrivacyPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

const AppLayout = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const Main = styled.main`
	flex: 1;
`;

const App = () => {
	const init = useAuthStore((state) => state.init);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<Router>
			<AppLayout>
				<Navbar />

				<Main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/post/:postId" element={<PostDetailsPage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/author/:uid" element={<AuthorPage />} />
						<Route path="/create" element={<CreatePostPage />} />
						<Route path="/notifications" element={<NotificationsPage />} />
						<Route path="/edit-post/:postId" element={<EditPostPage />} />
						<Route path={`/privacy`} element={<PrivacyPage />} />
						<Route path={`/dashboard`} element={<DashboardPage />} />
					</Routes>
				</Main>

				<Footer />
			</AppLayout>

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
