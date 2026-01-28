import { useState } from 'react';
import styled from 'styled-components';

import { IoIosArrowDown } from 'react-icons/io';
import { Container } from '../style/Container';

const Wrap = styled.div`
	padding: 100px 0 120px 0;
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
`;

const Item = styled.div`
	border-bottom: 1px solid var(--color-grey-light);
`;

const Button = styled.button`
	width: 100%;
	padding: 18px;
	display: flex;
	justify-content: space-between;

	@media (max-width: 767px) {
		padding: 18px 0 18px 0;
	}
`;

const Question = styled.p`
	font-weight: 400;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	text-align: start;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const Arrow = styled(IoIosArrowDown)`
	transition: transform 0.3s ease;
	font-weight: 400;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	flex-shrink: 0;

	&.open {
		transform: rotate(180deg);
	}
`;

const Answer = styled.div`
	padding: 0 18px 18px 18px;
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 20px;
		line-height: 25px;
	}
`;

const data = [
	{
		question: 'What should I do first?',
		answer: 'Start by reading a post and leaving a short comment. Even one sentence is great practice!',
	},
	{
		question: 'What is this platform about?',
		answer: 'This is a space to practise English through posts, comments, and discussions — not traditional lessons.',
	},
	{
		question: 'What level of English do I need?',
		answer: 'The platform is best for A2–B1, but B2 learners are also welcome to practise fluency and confidence.',
	},
	{
		question: 'My level is B2. Can this platform help me?',
		answer: 'Yes! You can practise writing, sharing opinions, and communicating naturally — without pressure.',
	},
	{
		question: 'Do I need to comment on every post?',
		answer: 'No 😊 Comment when you feel ready. Quality matters more than quantity.',
	},
	{
		question: 'Is it okay to make mistakes here?',
		answer: 'Absolutely. Mistakes are part of learning — this is a safe place to practise.',
	},
	{
		question: 'Will someone correct my English?',
		answer: 'Yes, sometimes you’ll see friendly and helpful corrections or suggestions — always with care and respect.',
	},
	{
		question: 'How often are new posts added?',
		answer: 'New posts appear every week, with different topics and simple tasks.',
	},
	{
		question: 'Is this a course?',
		answer: 'Not yet. This platform helps us practise and explore topics. Courses (1-month and 3-month) will be built based on what you enjoy most here.',
	},
	{
		question: 'How can I stay active and improve faster?',
		answer: 'Read posts, write comments, join discussions — and follow our Telegram channel for updates and extra practice.',
	},
];

const FAQsPage = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleFAQ = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	return (
		<Wrap>
			<Container>
				<Inner>
					{data.map((item, index) => (
						<Item key={index}>
							<Button onClick={() => toggleFAQ(index)}>
								<Question>{item.question}</Question>
								<Arrow className={`${activeIndex === index ? 'open' : ''}`} />
							</Button>

							{activeIndex === index && <Answer>{item.answer}</Answer>}
						</Item>
					))}
				</Inner>
			</Container>
		</Wrap>
	);
};

export default FAQsPage;
