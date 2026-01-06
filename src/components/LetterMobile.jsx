import styled from 'styled-components';

import avatar from '../assets/LetterSection/anna-avatar.png';
import letter from '../assets/LetterSection/letter-mobile.png';
import vectorTop from '../assets/Vectors/vector-letter-mobile-top.png';
import vectorBottom from '../assets/Vectors/vector-letter-mobile-bottom.png';
import brackets from '../assets/LetterSection/brackets-mobile.png';
import frame from '../assets/LetterSection/frame-mobile.png';
import { Container } from '../style/Container';

const Section = styled.div`
	padding: 60px 0px 90px 0px;
	background-color: var(--bg-white);
	background-image: url(${vectorTop}), url(${vectorBottom});
	background-repeat: no-repeat, no-repeat;
	background-position: right top -60px, left bottom -150px;
`;

const Author = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 100px;
	margin-bottom: 20px;

	&::after {
		position: absolute;
		content: '';
		top: -100px;
		left: 0;
		width: 150px;
		height: 134px;
		background-image: url(${brackets});
	}
`;

const Avatar = styled.div`
	z-index: 2;
	width: 52px;
	height: 52px;
	border-radius: 50%;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Name = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-black-change);
`;

const Inspirer = styled.span`
	font-weight: 400;
	font-size: 12px;
	line-height: 14.4px;
	color: var(--color-grey-light);
	text-transform: uppercase;
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 36px;
	margin-bottom: 36px;
`;

const Text = styled.p`
	font-weight: 700;
	font-size: 22px;
	line-height: 26.4px;
	color: var(--color-black-change);
`;

const Frame = styled.div`
	position: relative;
	background-image: url(${frame});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	width: 100%;
	display: block;
	min-height: 198px;
	padding: 35px 0 0 30px;
	margin-bottom: 52px;
`;

const Title = styled.h3`
	font-weight: 700;
	font-size: 22px;
	line-height: 26.4px;
	color: var(--color-black-change);
	text-align: start;
	margin-bottom: 10px;
`;

const Btn = styled.button`
	margin-bottom: 0px;
	padding: 10px 26px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-white);
	background-color: var(--color-accent);
	width: fit-content;
	transition: all 0.25s ease;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-accent);
	}
`;

const Attention = styled.span`
	display: block;
	max-width: 144px;
	font-weight: 400;
	font-size: 10px;
	line-height: 12px;
	color: var(--color-not-change);
`;

const ImageLetter = styled.img`
	position: absolute;
	bottom: -21px;
	left: 194px;
	width: 125px;
`;

const LetterMobile = ({ handleClick }) => {
	return (
		<Section>
			<Container>
				<Author>
					<Avatar>
						<img src={avatar} alt="avatar" />
					</Avatar>
					<div>
						<Name>Anna Yakushkina</Name>
						<Inspirer>Project Author</Inspirer>
					</div>
				</Author>

				<TextBox>
					<Text>
						Here you can begin your journey of friendship, support,
						and English fun. You can show your talents and enjoy
						learning together.
					</Text>
					<Text>And I will be your first penfriend!</Text>
				</TextBox>

				<Frame>
					<Title>
						"Dear penfriend,
						<br /> Hi. My name is Anna.
						<br /> What is your name?"
					</Title>
					<Attention>
						Your message will be shown as a comment. Everyone on the
						site will see it — and may answer it.
					</Attention>
					<ImageLetter src={letter} alt="letter" />
				</Frame>

				<Btn onClick={handleClick}>Reply to the author</Btn>
			</Container>
		</Section>
	);
};

export default LetterMobile;
