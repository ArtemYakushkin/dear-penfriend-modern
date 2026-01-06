import styled from 'styled-components';

import SliderAvatar from './SliderAvatar';
import slide1 from '../assets/Slider/slide1tab.png';
import slide2 from '../assets/Slider/slide2tab.png';
import slide3 from '../assets/Slider/slide3tab.png';
import slide4 from '../assets/Slider/slide4tab.png';
import stars from '../assets/Slider/stars.png';

const Wrap = styled.div`
	&.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 0;
		transition: opacity 1.5s ease;
		pointer-events: none;
		z-index: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&.slide-active {
		opacity: 1;
		pointer-events: auto;
		z-index: 2;
	}
`;

const Content = styled.div`
	flex-direction: column;
	gap: 0;
`;

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	gap: 16px;

	img {
		width: 90px;
		height: auto;
		margin-top: 8px;
	}
`;

const Title = styled.h3`
	font-weight: 700;
	font-size: 40px;
	line-height: 46px;
	color: var(--color-black-change);
	margin-bottom: 20px;
`;

const Image = styled.div`
	width: 100%;
	height: 504px;
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	overflow: hidden;

	&.slide1 {
		background-image: url(${slide1});
	}

	&.slide2 {
		background-image: url(${slide2});
	}

	&.slide3 {
		background-image: url(${slide3});
	}

	&.slide4 {
		background-image: url(${slide4});
	}
`;

const TextBox = styled.div`
	margin-top: auto;
	padding: 20px 30px;
	background: linear-gradient(
		180deg,
		rgba(37, 36, 37, 0.6) 0%,
		rgba(9, 78, 190, 0.6) 122.06%
	);
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const Text = styled.p`
	font-weight: 700;
	font-size: 20px;
	line-height: 25px;
	color: var(--color-white);
`;

const Btn = styled.button`
	margin-top: 20px;
	margin-right: 20px;
	margin-left: auto;
	padding: 20px 56px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
	background-color: var(--color-accent);

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}
`;

const SliderTablet = ({ currentSlide, handleRegisterClick }) => {
	const tabletSlides = [
		<Content>
			<Title>What is the Dear Penfriend project?</Title>
			<Image className="slide1">
				<SliderAvatar />
				<TextBox>
					<Text>
						Dear Penfriend is a Ukrainian platform that helps
						children from around the world learn English.
					</Text>
					<Text>
						You can watch educational videos and images. You can
						comment, chat, learn new words, and get replies from
						teachers and other students.
					</Text>
					<Text>It’s a safe and fun place to learn together.</Text>
				</TextBox>
			</Image>
		</Content>,

		<Content>
			<TitleBox>
				<Title style={{ marginBottom: '0px' }}>
					Interactives and bonus system
				</Title>
				<img src={stars} alt="stars" />
			</TitleBox>
			<Image className="slide2">
				<SliderAvatar />
				<TextBox>
					<Text>
						When you take part in quizzes, answer questions, and
						join the chats — you get likes and your rating grows.
					</Text>
					<Text>Be active, be kind, and become a top student!</Text>
				</TextBox>
			</Image>
		</Content>,

		<Content>
			<Title>Advantages of the platform</Title>
			<Image className="slide3">
				<SliderAvatar />
				<TextBox>
					<Text>
						Easy to use, interesting videos and pictures, fun games
						and tasks. Discuss topics and make friends from other
						countries. Talk and learn English in real chats.
					</Text>
				</TextBox>
			</Image>
		</Content>,

		<Content>
			<Title>Join today and make friends!</Title>
			<Image className="slide4">
				<Btn onClick={handleRegisterClick}>Register</Btn>
				<TextBox>
					<Text>
						Join thousands of students and teachers from around the
						world! Learn English with fun, talk with others, and
						enjoy the journey. Sign up — it’s easy to start!
					</Text>
				</TextBox>
			</Image>
		</Content>,
	];

	return (
		<>
			{tabletSlides.map((slide, index) => (
				<Wrap
					key={index}
					className={`slide ${
						currentSlide === index ? 'slide-active' : ''
					}`}
				>
					{slide}
				</Wrap>
			))}
		</>
	);
};

SliderTablet.count = 4;

export default SliderTablet;
