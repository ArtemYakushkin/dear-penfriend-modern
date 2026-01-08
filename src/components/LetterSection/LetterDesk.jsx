import styled from 'styled-components';
import { FiAlertTriangle } from 'react-icons/fi';

import { Container } from '../../style/Container';
import vector from '../../assets/Vectors/vector-letter.png';
import brackets from '../../assets/LetterSection/brackets.png';
import avatar from '../../assets/LetterSection/anna-avatar.png';
import frame from '../../assets/LetterSection/frame.png';
import letter from '../../assets/LetterSection/letter.png';

const Section = styled.div`
	padding-bottom: 120px;
`;

const Wrap = styled.div`
	background-color: var(--bg-letter);
	background-image: url(${vector});
	background-repeat: no-repeat;
	background-position: bottom right;
	backdrop-filter: blur(50px);
	box-shadow: 0px 4px 20px 0px #094ebe33;
	border-radius: 30px;
	padding: 71px 97px 101px 81px;
	display: flex;
	gap: 41px;
`;

const Brackets = styled.div`
	flex-shrink: 0;
`;

const Author = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 30px;
`;

const Avatar = styled.div`
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
	gap: 45px;
	margin-bottom: 29px;
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
	align-items: center;
	justify-content: center;
`;

const Title = styled.h3`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	text-align: center;
	margin-bottom: 26px;
`;

const Btn = styled.button`
	margin-bottom: 20px;
	padding: 14px 36px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
	background-color: var(--color-accent);
	width: fit-content;
	transition: all 0.25s ease;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}
`;

const Attention = styled.span`
	display: flex;
	align-items: center;
	gap: 5px;
	max-width: 400px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-not-change);
`;

const ImageLetter = styled.img`
	position: absolute;
	bottom: -30%;
	left: 5%;
	width: 166px;
	height: auto;
`;

const LetterDesk = ({ handleClick }) => {
	return (
		<Section>
			<Container>
				<Wrap>
					<Brackets>
						<img src={brackets} alt="brackets" />
					</Brackets>

					<div>
						<Author>
							<Avatar>
								<img src={avatar} alt="author" />
							</Avatar>
							<div>
								<Name>Anna Yakushkina</Name>
								<Inspirer>Project Author</Inspirer>
							</div>
						</Author>

						<TextBox>
							<Text>
								Here you can begin your journey of friendship, support, and English fun. You can show
								your talents and enjoy learning together.
							</Text>
							<Text>And I will be your first penfriend!</Text>
						</TextBox>

						<Frame>
							<Title>
								"Dear penfriend,
								<br /> Hi. My name is Anna. What is your name"?
							</Title>
							<Btn onClick={handleClick}>Reply to the author</Btn>
							<Attention>
								<FiAlertTriangle size={16} />
								Your message will be shown as a comment. Everyone on the site will see it — and may
								answer it.
							</Attention>
							<ImageLetter src={letter} alt="letter" />
						</Frame>
					</div>
				</Wrap>
			</Container>
		</Section>
	);
};

export default LetterDesk;
