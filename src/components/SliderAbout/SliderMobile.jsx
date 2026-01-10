import styled from 'styled-components';

import SliderAvatar from './SliderAvatar';
import slide1 from '../../assets/Slider/slide1mobile.png';
import slide2 from '../../assets/Slider/slide2mobile.png';
import slide3 from '../../assets/Slider/slide3mobile.png';
import slide4 from '../../assets/Slider/slide4mobile.png';
import stars from '../../assets/Slider/starsMobile.png';

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

const Title = styled.h3`
	position: relative;
	font-weight: 700;
	font-size: 40px;
	line-height: 46px;
	color: var(--color-black-change);

	&.title1 {
		margin-bottom: 28px;
	}

	&.title2 {
		margin-bottom: 74px;
	}

	&.title3 {
		margin-bottom: 74px;
	}

	&.title4 {
		margin-bottom: 74px;
	}
`;

const Image = styled.div`
	position: relative;
	border-radius: 30px;
	overflow: hidden;
	margin-bottom: 36px;
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const Text = styled.p`
	font-weight: 700;
	font-size: 20px;
	line-height: 25px;
	color: var(--color-black-change);
`;

const Btn = styled.button`
	margin-top: 20px;
	padding: 14px 36px;
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

const SliderMobile = ({ currentSlide, handleRegisterClick }) => {
	const mobileSlides = [
		<Content>
			<Title className="title1">
				What is the
				<br /> Dear Penfriend project?
				<SliderAvatar style={{ bottom: '0px', right: '46px' }} />
			</Title>
			<Image>
				<img src={slide1} alt="slideMob1" />
			</Image>
			<TextBox>
				<Text>
					Dear Penfriend is a Ukrainian platform that helps children from around the world learn English.
				</Text>
				<Text>
					You can watch educational videos and images. You can comment, chat, learn new words, and get replies
					from teachers and other students.
				</Text>
				<Text>It’s a safe and fun place to learn together.</Text>
			</TextBox>
		</Content>,

		<Content>
			<Title className="title2">
				Interactives and bonus system
				<SliderAvatar />
			</Title>
			<Image>
				<img src={slide2} alt="slideMob1" />
				<img style={{ position: 'absolute', top: '12px', right: '17px' }} src={stars} alt="stars" />
			</Image>
			<TextBox>
				<Text>
					When you take part in quizzes, answer questions, and join the chats — you get likes and your rating
					grows.
				</Text>
				<Text>Be active, be kind, and become a top student!</Text>
			</TextBox>
		</Content>,

		<Content>
			<Title className="title3">
				Advantages of the platform
				<SliderAvatar />
			</Title>
			<Image>
				<img src={slide3} alt="slideMob3" />
			</Image>
			<TextBox>
				<Text>
					Easy to use, interesting videos and pictures, fun games and tasks. Discuss topics and make friends
					from other countries. Talk and learn English in real chats.
				</Text>
			</TextBox>
		</Content>,

		<Content>
			<Title className="title4">
				Join today and make friends!
				<SliderAvatar />
			</Title>
			<Image>
				<img src={slide4} alt="slideMob4" />
			</Image>
			<TextBox>
				<Text>
					Join thousands of students and teachers from around the world! Learn English with fun, talk with
					others, and enjoy the journey. Sign up — it’s easy to start!
				</Text>
			</TextBox>
			<Btn onClick={handleRegisterClick}>Register</Btn>
		</Content>,
	];

	return (
		<>
			{mobileSlides.map((slide, index) => (
				<Wrap key={index} className={`slide ${currentSlide === index ? 'slide-active' : ''}`}>
					{slide}
				</Wrap>
			))}
		</>
	);
};

SliderMobile.count = 4;

export default SliderMobile;
