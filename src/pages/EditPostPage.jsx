import { useEditPost } from '../hooks/useEditPost';
import { useResponsive } from '../hooks/useResponsive';
import { Container } from '../style/Container';
import {
	Wrap,
	Form,
	InputBox,
	Input,
	Textarea,
	Placeholder,
	Tabs,
	BtnTabs,
	Section,
	QuizAnswers,
	CorrectBox,
	InputRadio,
	TextCorrect,
	BtnDelete,
	BtnAddAnswer,
	PollGroup,
	PollLabel,
	MediaList,
	Image,
	BtnDeleteMedia,
	AddFile,
	AddLabel,
	BtnCreate,
} from '../style/CreateEditStyles';

import { MdOutlineDelete } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

const EditPostPage = () => {
	const {
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
	} = useEditPost();
	const { isTablet } = useResponsive();

	return (
		<Wrap>
			<Container>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						handleUpdate();
					}}
				>
					<InputBox>
						<Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
						<Placeholder>Title</Placeholder>
					</InputBox>

					<InputBox style={{ height: '250px' }}>
						<Textarea value={text} onChange={(e) => setText(e.target.value)} />
						<Placeholder>Text</Placeholder>
					</InputBox>

					<Tabs>
						<BtnTabs
							type="button"
							className={`${activeTab === 'Quiz' ? 'tabs-btn-active' : ''}`}
							onClick={() => handleTabChange('Quiz')}
						>
							Quiz
						</BtnTabs>
						<BtnTabs
							type="button"
							className={`${activeTab === 'Poll' ? 'tabs-btn-active' : ''}`}
							onClick={() => handleTabChange('Poll')}
						>
							Poll
						</BtnTabs>
						<BtnTabs
							type="button"
							className={`${activeTab === null ? 'tabs-btn-active' : ''}`}
							onClick={() => handleTabChange(null)}
						>
							None
						</BtnTabs>
					</Tabs>

					{activeTab === 'Quiz' && (
						<Section>
							<InputBox>
								<Input type="text" value={quiz.question} onChange={handleQuizChange} />
								<Placeholder>Question:</Placeholder>
							</InputBox>

							{quiz.answers.map((answer, index) => (
								<QuizAnswers key={index}>
									<InputBox>
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
											onChange={() => setQuiz({ ...quiz, correctAnswer: index })}
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
										<BtnDelete type="button" onClick={() => removeQuizAnswer(index)}>
											<MdOutlineDelete size={isTablet ? '30' : '40'} />
										</BtnDelete>
									</CorrectBox>
								</QuizAnswers>
							))}
							<BtnAddAnswer type="button" onClick={addQuizAnswer}>
								Add Answer
							</BtnAddAnswer>
						</Section>
					)}

					{activeTab === 'Poll' && (
						<Section>
							<InputBox>
								<Input type="text" name="question" value={poll.question} onChange={handlePollChange} />
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
						<MediaList>
							{oldMedia.map((url, i) => (
								<Image key={`old-${i}`}>
									<img src={url} alt="media" />
									<BtnDeleteMedia type="button" onClick={() => removeOldMedia(url)}>
										<IoClose size={42} />
									</BtnDeleteMedia>
								</Image>
							))}
							{newMedia.map((item, i) => (
								<Image key={`new-${i}`}>
									<img src={item.preview} alt="new media" />
									<BtnDeleteMedia type="button" onClick={() => removeNewMedia(i)}>
										<IoClose size={42} />
									</BtnDeleteMedia>
								</Image>
							))}
						</MediaList>

						<AddFile>
							<AddLabel htmlFor="imageInputCreate">Add Media</AddLabel>
							<input
								style={{ display: 'none' }}
								id="imageInputCreate"
								type="file"
								multiple
								accept="image/jpeg, image/png, image/gif, video/mp4"
								onChange={handleMediaChange}
							/>
						</AddFile>
					</Section>

					<BtnCreate type="submit">Update Post</BtnCreate>
				</Form>
			</Container>
		</Wrap>
	);
};

export default EditPostPage;
