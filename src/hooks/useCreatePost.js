import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { createPost } from '../api/createApi';
import { toast } from 'react-toastify';

export const useCreatePost = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [files, setFiles] = useState([]);
	const [quiz, setQuiz] = useState({ question: '', answers: [], correctAnswer: null });
	const [poll, setPoll] = useState({ question: '', answers: ['Yes', 'No'] });
	const [activeTab, setActiveTab] = useState('Quiz');
	const [previews, setPreviews] = useState([]);

	const submit = async () => {
		if (!user) {
			toast.error('You must be logged in');
			return;
		}

		try {
			await createPost({
				user,
				title,
				text,
				files,
				quiz,
				poll,
				activeTab,
			});

			toast.success('Post created');
			navigate('/');
		} catch (e) {
			console.error(e);
			toast.error('Failed to create post');
		}
	};

	return {
		title,
		setTitle,
		text,
		setText,
		files,
		setFiles,
		quiz,
		setQuiz,
		poll,
		setPoll,
		activeTab,
		setActiveTab,
		submit,
		previews,
		setPreviews,
	};
};
