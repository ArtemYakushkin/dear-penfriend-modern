import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../api/editPostApi';
import { uploadMediaFiles, deleteMediaByUrl } from '../api/editPostMediaApi';

export const useEditPost = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [oldMedia, setOldMedia] = useState([]);
	const [newMedia, setNewMedia] = useState([]);
	const [activeTab, setActiveTab] = useState(null);
	const [quiz, setQuiz] = useState({ question: '', answers: [''], correctAnswer: null });
	const [poll, setPoll] = useState({ question: '' });

	// fetch post
	useEffect(() => {
		const load = async () => {
			const post = await getPostById(postId);
			if (!post) return;

			setTitle(post.title);
			setText(post.text);
			setOldMedia(post.media || []);

			if (post.quiz) {
				setActiveTab('Quiz');
				setQuiz(post.quiz);
			} else if (post.poll) {
				setActiveTab('Poll');
				setPoll(post.poll);
			}
		};

		load();
	}, [postId]);

	// media
	const handleMediaChange = (e) => {
		const files = Array.from(e.target.files);
		setNewMedia((prev) => [
			...prev,
			...files.map((file) => ({
				file,
				preview: URL.createObjectURL(file),
			})),
		]);
	};

	const removeOldMedia = async (url) => {
		setOldMedia((prev) => prev.filter((m) => m !== url));
		await deleteMediaByUrl(url);
	};

	const removeNewMedia = (index) => {
		setNewMedia((prev) => prev.filter((_, i) => i !== index));
	};

	// quiz
	const handleQuizChange = (e) => {
		setQuiz({ ...quiz, question: e.target.value });
	};

	const handleQuizAnswerChange = (index, value) => {
		const answers = [...quiz.answers];
		answers[index] = value;
		setQuiz({ ...quiz, answers });
	};

	const addQuizAnswer = () => {
		setQuiz({ ...quiz, answers: [...quiz.answers, ''] });
	};

	const removeQuizAnswer = (index) => {
		const answers = quiz.answers.filter((_, i) => i !== index);
		const correct =
			quiz.correctAnswer === index
				? null
				: quiz.correctAnswer > index
				? quiz.correctAnswer - 1
				: quiz.correctAnswer;

		setQuiz({ ...quiz, answers, correctAnswer: correct });
	};

	// poll
	const handlePollChange = (e) => {
		setPoll({ ...poll, [e.target.name]: e.target.value });
	};

	// tabs
	const handleTabChange = (tab) => {
		setActiveTab(tab);

		if (tab === 'Quiz') setPoll({ question: '' });
		if (tab === 'Poll') setQuiz({ question: '', answers: [''], correctAnswer: null });
		if (tab === null) {
			setQuiz({ question: '', answers: [''], correctAnswer: null });
			setPoll({ question: '' });
		}
	};

	// update
	const handleUpdate = async () => {
		const uploadedUrls = await uploadMediaFiles(newMedia.map((m) => m.file));

		await updatePost({
			postId,
			title,
			text,
			media: [...oldMedia, ...uploadedUrls],
			activeTab,
			quiz,
			poll,
		});

		navigate('/');
	};

	return {
		title,
		setTitle,
		text,
		setText,
		oldMedia,
		newMedia,
		activeTab,
		quiz,
		setQuiz,
		poll,
		setPoll,

		handleMediaChange,
		removeOldMedia,
		removeNewMedia,
		handleQuizChange,
		handleQuizAnswerChange,
		addQuizAnswer,
		removeQuizAnswer,
		handlePollChange,
		handleTabChange,
		handleUpdate,
	};
};
