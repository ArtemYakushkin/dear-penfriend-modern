import { useEffect } from 'react';
import styled from 'styled-components';

import { useCreatePost } from '../hooks/useCreatePost';
import { useResponsive } from '../hooks/useResponsive';
import { Container } from '../style/Container';

const Wrap = styled.div`
	padding: 30px 0px 60px 0px;

	@media (max-width: 767px) {
		background-color: var(--bg-white);
		margin-top: 81px;
	}
`;

const Form = styled.form`
	background-color: var(--bg-white);
	border-radius: 30px;
	padding: 40px;
	box-shadow: 0px 4px 16px 0px #2f7bf626;
	display: flex;
	flex-direction: column;
	gap: 20px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 20px;
	}

	@media (max-width: 767px) {
		background-color: transparent;
		border-radius: 0px;
		box-shadow: none;
		padding: 0px;
	}
`;

const InputBox = styled.div`
	position: relative;
	width: 100%;
	height: 54px;
`;

const Input = styled.input`
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background-color: var(--bg-auth-input);
	border: 1px solid var(--bg-auth-input);
	padding: 22px 18px 10px 18px;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);

	&:focus {
		border: 1px solid var(--color-accent);
	}
`;

const Textarea = styled.textarea`
	resize: none;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background-color: var(--bg-auth-input);
	border: 1px solid var(--bg-auth-input);
	padding: 22px 18px 10px 18px;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);

	&:focus {
		border: 1px solid var(--color-accent);
	}
`;

const Placeholder = styled.span`
	position: absolute;
	top: 3px;
	left: 18px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-grey-light);
`;

const Tabs = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	border-bottom: 1px solid var(--color-grey-light);

	@media (max-width: 767px) {
		gap: 12px;
	}
`;

const BtnTabs = styled.button`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	color: var(--color-grey-light);
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	transition: color 0.3s;

	&.tabs-btn-active {
		color: var(--color-black-change);
		position: relative;

		&::after {
			position: absolute;
			content: '';
			width: 100%;
			height: 3px;
			background-color: var(--color-accent);
			bottom: -1px;
			left: 0;
		}
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

const Section = styled.div`
	border: 1px solid var(--color-grey-light);
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 12px;
	}

	@media (max-width: 767px) {
		border: none;
		border-bottom: 1px solid var(--color-grey-light);
		border-radius: 0px;
		padding: 0px 0px 20px 0px;
	}
`;

const QuizAnswers = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;

	@media (max-width: 767px) {
		align-items: flex-start;
		flex-direction: column;
		gap: 12px;
		border: 1px solid var(--text-grey-light);
		border-radius: 10px;
		padding: 4px;
	}
`;

const CorrectBox = styled.label`
	display: flex;
	align-items: center;
	gap: 8px;

	@media (min-width: 768px) and (max-width: 1259px) {
	}

	@media (max-width: 767px) {
	}
`;

const InputRadio = styled.input`
	width: 20px;
	height: 20px;

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 16px;
		height: 16px;
	}

	@media (max-width: 767px) {
		width: 16px;
		height: 16px;
	}
`;

const TextCorrect = styled.span`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

const BtnAddAnswer = styled.button`
	border: 1px solid var(--color-accent);
	color: var(--color-accent);
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
	border-radius: 30px;
	padding: 14px 36px;
	align-self: flex-start;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
		padding: 10px 26px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
		padding: 10px 26px;
	}
`;

const PollGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

const PollLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 12px;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

const MediaList = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 767px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const Image = styled.div`
	position: relative;
	width: 100%;
	height: 275px;
	border-radius: 20px;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 200px;
	}

	@media (max-width: 767px) {
		height: 180px;
	}
`;

const AddFile = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const AddLabel = styled.label`
	border: 1px solid var(--color-accent);
	color: var(--color-accent);
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
	border-radius: 30px;
	padding: 14px 36px;
	cursor: pointer;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
		padding: 10px 26px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
		padding: 10px 26px;
	}
`;

const BtnCreate = styled.button`
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
	border-radius: 30px;
	padding: 14px 36px;
	transition: all 0.25s ease;
	color: var(--color-white);
	background-color: var(--color-accent);
	align-self: center;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
		padding: 10px 26px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
		padding: 10px 26px;
		width: 100%;
	}
`;

const CreatePostPage = () => {
	const {
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
	} = useCreatePost();
	const { isMobile } = useResponsive();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleQuizQuestionChange = (e) => {
		setQuiz((prev) => ({
			...prev,
			question: e.target.value,
		}));
	};

	const handleQuizAnswerChange = (index, value) => {
		setQuiz((prev) => {
			const answers = [...prev.answers];
			answers[index] = value;

			return {
				...prev,
				answers,
			};
		});
	};

	const handleCorrectAnswerChange = (index) => {
		setQuiz((prev) => ({
			...prev,
			correctAnswer: index,
		}));
	};

	const addAnswer = () => {
		setQuiz((prev) => ({
			...prev,
			answers: [...prev.answers, ''],
		}));
	};

	const handlePollQuestionChange = (e) => {
		setPoll((prev) => ({
			...prev,
			question: e.target.value,
		}));
	};

	const handleFilesChange = (e) => {
		const selectedFiles = Array.from(e.target.files);

		if (!selectedFiles.length) return;

		setFiles(selectedFiles);

		const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

		setPreviews(previewUrls);
	};

	return (
		<Wrap>
			<Container>
				<Form
					className="create-wrapp"
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}
				>
					<InputBox>
						<Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
						<Placeholder>Create title</Placeholder>
					</InputBox>

					<InputBox style={{ height: '250px' }}>
						<Textarea value={text} onChange={(e) => setText(e.target.value)} />
						<Placeholder>Create text</Placeholder>
					</InputBox>

					<Tabs>
						<BtnTabs
							className={`${activeTab === 'Quiz' ? 'tabs-btn-active' : ''}`}
							type="button"
							onClick={() => setActiveTab('Quiz')}
						>
							Quiz
						</BtnTabs>
						<BtnTabs
							className={`${activeTab === 'Poll' ? 'tabs-btn-active' : ''}`}
							type="button"
							onClick={() => setActiveTab('Poll')}
						>
							Poll
						</BtnTabs>
					</Tabs>

					{activeTab === 'Quiz' && (
						<Section>
							<InputBox>
								<Input type="text" value={quiz.question} onChange={handleQuizQuestionChange} />
								<Placeholder>Question:</Placeholder>
							</InputBox>

							{quiz.answers.map((answer, index) => (
								<QuizAnswers key={index}>
									<InputBox style={{ width: isMobile ? '100%' : '50%' }}>
										<Input
											type="text"
											value={answer}
											onChange={(e) => handleQuizAnswerChange(index, e.target.value)}
										/>
										<Placeholder>Answer:</Placeholder>
									</InputBox>

									<CorrectBox>
										<InputRadio
											type="radio"
											name="correctAnswer"
											checked={quiz.correctAnswer === index}
											onChange={() => handleCorrectAnswerChange(index)}
										/>
										<TextCorrect
											style={{
												color:
													quiz.correctAnswer === index
														? 'var(--color-accent)'
														: 'var(--color-black-change)',
											}}
										>
											Correct
										</TextCorrect>
									</CorrectBox>
								</QuizAnswers>
							))}

							<BtnAddAnswer type="button" onClick={addAnswer}>
								Add Answer
							</BtnAddAnswer>
						</Section>
					)}

					{activeTab === 'Poll' && (
						<Section>
							<InputBox>
								<Input
									type="text"
									name="question"
									value={poll.question}
									onChange={handlePollQuestionChange}
								/>
								<Placeholder>Question:</Placeholder>
							</InputBox>
							<PollGroup>
								<PollLabel>
									Yes
									<InputRadio type="radio" name="pollAnswer" value="Yes" disabled />
								</PollLabel>
								<PollLabel>
									No
									<InputRadio type="radio" name="pollAnswer" value="No" disabled />
								</PollLabel>
							</PollGroup>
						</Section>
					)}

					<Section>
						{files.length > 0 && (
							<MediaList>
								{previews.map((src, index) => (
									<Image key={index}>
										<img src={src} alt={`Preview ${index + 1}`} />
									</Image>
								))}
							</MediaList>
						)}

						<AddFile>
							<AddLabel htmlFor="imageInputCreate">Add Media</AddLabel>
							<input
								style={{ display: 'none' }}
								id="imageInputCreate"
								type="file"
								multiple
								accept="image/jpeg, image/png, image/gif, video/mp4"
								onChange={handleFilesChange}
							/>
						</AddFile>
					</Section>

					<BtnCreate type="submit">Create</BtnCreate>
				</Form>
			</Container>
		</Wrap>
	);
};

export default CreatePostPage;
