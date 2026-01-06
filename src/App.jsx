import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthStore } from './store/useAuthStore';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import AuthorPage from './pages/AuthorPage';
// import Loader from './components/Loader';
import Footer from './components/Footer';

// const allowedEmails = process.env.REACT_APP_ALLOWED_EMAILS?.split(',') || [];

const App = () => {
	const init = useAuthStore((state) => state.init);

	useEffect(() => {
		init();
	}, [init]);

	// const [user, setUser] = useState(null);
	// const [authChecked, setAuthChecked] = useState(false);

	// useEffect(() => {
	// 	const auth = getAuth();
	// 	const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
	// 		setUser(firebaseUser);
	// 		setAuthChecked(true);
	// 	});

	// 	return () => unsubscribe();
	// }, []);

	// if (!authChecked) {
	// 	return <Loader />;
	// }

	// const isAllowed = user && allowedEmails.includes(user.email);

	return (
		<Router>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/post/:postId" element={<PostDetailsPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/author/:uid" element={<AuthorPage />} />
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
