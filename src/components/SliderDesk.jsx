import styled from 'styled-components';

import SliderAvatar from './SliderAvatar';
import slide1 from '../assets/Slider/slide1.png';
import slide2 from '../assets/Slider/slide2.png';
import slide3 from '../assets/Slider/slide3.png';
import slide4 from '../assets/Slider/slide4.png';
import star from '../assets/Slider/starSmall.png';

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
	display: flex;
	align-items: center;
	gap: 78px;
`;

const TextBox = styled.div`
	max-width: 408px;
`;

const Title = styled.h4`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
	position: relative;
	margin-bottom: 20px;

	span {
		position: absolute;
		bottom: 15px;
		right: 0px;
		display: flex;
		padding: 2px 10px 0 10px;
		width: 93px;
		background-color: var(--bg-white);
		border-radius: 100px;
		backdrop-filter: blur(20px);
		box-shadow: 0px 4px 4px 0px #00000040;
	}
`;

const Text = styled.p`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);
	margin-bottom: 33px;
`;

const Image = styled.div`
	height: 529px;
	border-radius: 30px;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Btn = styled.button`
	padding: 16px 46px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
	background-color: var(--color-accent);
	margin-top: 40px;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}
`;

const SliderDesk = ({ currentSlide, handleRegisterClick }) => {
	const desktopSlides = [
		<Content>
			<TextBox>
				<SliderAvatar />
				<Title>What is the Dear Penfriend project?</Title>
				<Text>
					Dear Penfriend is a Ukrainian platform that helps children
					from around the world learn English.
				</Text>
				<Text>
					You can watch educational videos and images. You can
					comment, chat, learn new words, and get replies from
					teachers and other students.
				</Text>
				<Text style={{ marginBottom: '33px' }}>
					It’s a safe and fun place to learn together.
				</Text>
			</TextBox>
			<Image>
				<img src={slide1} alt="slide-1" />
			</Image>
		</Content>,

		<Content>
			<TextBox>
				<SliderAvatar />
				<Title>
					Interactives and bonus system
					<span>
						<img src={star} alt="star" />
						<img src={star} alt="star" />
						<img src={star} alt="star" />
					</span>
				</Title>
				<Text>
					When you take part in quizzes, answer questions, and join
					the chats — you get likes and your rating grows.
				</Text>
				<Text style={{ marginBottom: '33px' }}>
					Be active, be kind, and become a top student!
				</Text>
			</TextBox>
			<Image>
				<img src={slide2} alt="slide-2" />
			</Image>
		</Content>,

		<Content>
			<TextBox>
				<SliderAvatar />
				<Title>Advantages of the platform</Title>
				<Text>
					Easy to use, interesting videos and pictures, fun games and
					tasks. Discuss topics and make friends from other countries.
					Talk and learn English in real chats.
				</Text>
			</TextBox>
			<Image>
				<img src={slide3} alt="slide-3" />
			</Image>
		</Content>,

		<Content>
			<TextBox>
				<SliderAvatar />
				<Title>Join today!</Title>
				<Text>
					Join thousands of students and teachers from around the
					world! Learn English with fun, talk with others, and enjoy
					the journey. Sign up — it’s easy to start!
				</Text>
				<Btn onClick={handleRegisterClick}>Register</Btn>
			</TextBox>
			<Image>
				<img src={slide4} alt="slide-4" />
			</Image>
		</Content>,
	];

	return (
		<>
			{desktopSlides.map((slide, index) => (
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

SliderDesk.count = 4;

export default SliderDesk;
