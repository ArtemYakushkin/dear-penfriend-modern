import { useState, useEffect } from 'react';
import styled from 'styled-components';

import QuizSuccessMessage from './QuizSuccessMessage';
import QuizFailMessage from './QuizFailMessage';
import ModalQuiz from '../Modals/ModalQuiz';
import ModalUnregister from '../Modals/ModalUnregister';

const QuizWrap = styled.div`
	padding: 30px;
	background-color: var(--bg-poll-quiz);

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 20px;
	}

	@media (max-width: 767px) {
		padding: 20px 0px;
		background-color: transparent;
	}
`;

const Question = styled.h2`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);
	margin-bottom: 30px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 20px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
		margin-bottom: 20px;
	}
`;

const Answers = styled.ul`
	display: flex;
	align-items: center;
	gap: 11px;

	@media (min-width: 768px) and (max-width: 1259px) {
		flex-wrap: wrap;
	}

	@media (max-width: 767px) {
		flex-wrap: wrap;
	}
`;

const AnswerItem = styled.li`
	padding: 14px 36px;
	border: 1px solid var(--color-orange);
	border-radius: 30px;
	cursor: pointer;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-accent);

	&:hover {
		background-color: var(--color-orange);
		color: var(--color-white);
	}

	&.quiz-answer-selected {
		background-color: var(--color-orange);
		color: var(--color-white);
	}

	&.quiz-answer-disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 10px 26px;
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		padding: 6px 10px;
		font-size: 16px;
		line-height: 16px;
	}
`;

const Quiz = ({ quizData, user, postId }) => {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
	const [isAnswered, setIsAnswered] = useState(false);

	const quizKey = `quiz-${postId}-${quizData.question.replace(/\s+/g, '-')}-${user?.uid || 'guest'}`;

	useEffect(() => {
		const stored = localStorage.getItem(quizKey);
		if (stored) {
			const parsed = JSON.parse(stored);
			setSelectedAnswer(parsed.selectedAnswer);
			setIsAnswered(true);
		}
	}, [quizKey]);

	const canAnswer = () => {
		if (!user) {
			setIsModalOpen(true);
			return false;
		}
		if (isAnswered) return false;
		return true;
	};

	const saveCorrectAnswer = (index) => {
		setSelectedAnswer(index);
		setIsAnswered(true);
		localStorage.setItem(
			quizKey,
			JSON.stringify({
				selectedAnswer: index,
				correct: true,
			}),
		);
	};

	const showQuizResultModal = (message) => {
		setModalMessage(message);
		setIsQuizModalOpen(true);
	};

	const handleAnswerClick = (index) => {
		if (!canAnswer()) return;

		if (index === quizData.correctAnswer) {
			saveCorrectAnswer(index);
			showQuizResultModal(<QuizSuccessMessage />);
		} else {
			showQuizResultModal(<QuizFailMessage />);
		}
	};

	return (
		<QuizWrap>
			<Question>{quizData.question}</Question>
			<Answers>
				{quizData.answers.map((answer, index) => (
					<AnswerItem
						key={index}
						className={`quiz-answer ${
							isAnswered && index === selectedAnswer ? 'quiz-answer-selected' : ''
						} ${isAnswered && index !== selectedAnswer ? 'quiz-answer-disabled' : ''}`}
						onClick={() => handleAnswerClick(index)}
					>
						{answer}
					</AnswerItem>
				))}
			</Answers>

			<ModalQuiz isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} message={modalMessage} />
			<ModalUnregister isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</QuizWrap>
	);
};

export default Quiz;
