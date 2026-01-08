import styled from 'styled-components';

import avatar from '../../assets/LetterSection/anna-avatar.png';
import letter from '../../assets/LetterSection/letter-tablet.png';
import vector from '../../assets/Vectors/vector-letter-tablet.png';
import frame from '../../assets/LetterSection/frame-tablet.png';
import brackets from '../../assets/LetterSection/brackets-tablet.png';
import { Container } from '../../style/Container';

const Section = styled.div`
	padding: 60px 0px;
	background-color: var(--bg-white);
	background-image: url(${vector});
	background-repeat: no-repeat;
	background-position: 400px;
`;

const Author = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 30px;
	margin-top: 79px;

	&::after {
		position: absolute;
		content: '';
		top: -77px;
		left: 0;
		width: 126px;
		height: 103px;
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
	gap: 32px;
	margin-bottom: 40px;
`;

const Text = styled.p`
	font-weight: 700;
	font-size: 24px;
	line-height: 31.2px;
	color: var(--color-black-change);
`;

const Frame = styled.div`
	position: relative;
	background-image: url(${frame});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	width: 100%;
	min-height: 270px;
	display: flex;
	flex-direction: column;
	padding: 40px 0 0 75px;
	margin-bottom: 77px;
`;

const Title = styled.h3`
	font-weight: 700;
	font-size: 22px;
	line-height: 26.4px;
	color: var(--color-black-change);
	text-align: start;
	margin-bottom: 46px;
`;

const Btn = styled.button`
	margin-bottom: 16px;
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
	max-width: 254px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-not-change);
`;

const ImageLetter = styled.img`
	position: absolute;
	bottom: -100px;
	left: 358px;
	width: 280px;
`;

const LetterTablet = ({ handleClick }) => {
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
						Here you can begin your journey of friendship, support, and English fun. You can show your
						talents and enjoy learning together.
					</Text>
					<Text>And I will be your first penfriend!</Text>
				</TextBox>

				<Frame>
					<Title>
						"Dear penfriend,
						<br /> Hi. My name is Anna. What is your name?"
					</Title>
					<Btn onClick={handleClick}>Reply to the author</Btn>
					<Attention>
						Your message will be shown as a comment. Everyone on the site will see it — and may answer it.
					</Attention>
					<ImageLetter src={letter} alt="letter" />
				</Frame>
			</Container>
		</Section>
	);
};

export default LetterTablet;
