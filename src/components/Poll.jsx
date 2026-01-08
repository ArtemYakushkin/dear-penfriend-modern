import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { fetchPollVotes } from '../api/fetchPollVotes';
import { handlePollVote } from '../api/handlePollVote';
import { getPollPercentage } from '../utils/getPollPercentage';

import ModalUnregister from './Modals/ModalUnregister';

const PollWrap = styled.div`
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

const AnswerBlok = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	@media (max-width: 767px) {
		gap: 8px;
	}
`;

const Answer = styled.div`
	display: flex;
	align-items: center;
	gap: 19px;

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
`;

const Button = styled.button`
	width: 103px;
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--color-orange);
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-accent);

	&:hover {
		background-color: var(--color-orange);
		color: var(--color-white);
	}

	&.selected {
		background-color: var(--color-orange);
		color: var(--color-white);
	}

	&.poll-answer-button-selected {
		background-color: var(--color-orange);
		color: var(--color-white);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 103px;
		height: 36px;
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		width: 60px;
		height: 26px;
		font-size: 16px;
		line-height: 16px;
	}
`;

const Votes = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	width: 100%;
`;

const ProgressBar = styled.div`
	width: 100%;
	background-color: var(--color-white);
	border-radius: 90px;
	overflow: hidden;
	height: 10px;
	position: relative;

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 6px;
	}

	@media (max-width: 767px) {
		height: 5px;
	}
`;

const Progress = styled.div`
	height: 100%;
	background-color: var(--color-accent);
	border-radius: 10px;
	transition: width 0.5s ease;
	position: relative;
`;

const Text = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 12px;
	}
`;

const Poll = ({ pollData, postId, user }) => {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [pollVotes, setPollVotes] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const pollKey = `poll-${postId}-${pollData.question.replace(/\s+/g, '-')}-${user?.uid || 'guest'}`;

	useEffect(() => {
		const stored = localStorage.getItem(pollKey);
		if (stored) {
			const parsed = JSON.parse(stored);
			setSelectedAnswer(parsed.selectedAnswer);
		}

		fetchPollVotes({
			postId,
			answersLength: pollData.answers.length,
			setPollVotes,
		});
	}, [postId, pollData.answers.length, pollKey]);

	return (
		<PollWrap>
			<Question>{pollData.question}</Question>

			<AnswerBlok>
				{pollData.answers.map((answer, index) => (
					<Answer key={index}>
						<Button
							className={`poll-answer-button ${
								selectedAnswer === index ? 'poll-answer-button-selected' : ''
							}`}
							onClick={() =>
								handlePollVote({
									index,
									user,
									selectedAnswer,
									pollVotes,
									postId,
									pollKey,
									setSelectedAnswer,
									setPollVotes,
									setIsModalOpen,
								})
							}
							disabled={selectedAnswer !== null}
						>
							{answer}
						</Button>

						<Votes>
							<ProgressBar>
								<Progress
									style={{
										width: `${getPollPercentage(pollVotes, index)}%`,
									}}
								/>
							</ProgressBar>
							<Text>
								{pollVotes[index]} votes ({getPollPercentage(pollVotes, index)}%)
							</Text>
						</Votes>
					</Answer>
				))}
			</AnswerBlok>

			<ModalUnregister isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</PollWrap>
	);
};

export default Poll;
