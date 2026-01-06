import styled from 'styled-components';

import { useResponsive } from '../hooks/useResponsive';
import { useAuthModals } from '../hooks/useAuthModals';
import Register from './Register';
import Login from './Login';
import { Container } from '../style/Container';
import vector from '../assets/Vectors/vector-how.png';
import vectorTablet from '../assets/Vectors/vector-how-tablet.png';
import vectorMobile from '../assets/Vectors/vector-how-mobile.png';
import step1 from '../assets/HowItWork/step1.png';
import step2 from '../assets/HowItWork/step2.png';
import step3 from '../assets/HowItWork/step3.png';
import step1tabl from '../assets/HowItWork/step1-tablet.png';
import step2tabl from '../assets/HowItWork/step2-tablet.png';
import step3tabl from '../assets/HowItWork/step3-tablet.png';
import step1mob from '../assets/HowItWork/step1-mobile.png';
import step2mob from '../assets/HowItWork/step2-mobile.png';
import step3mob from '../assets/HowItWork/step3-mobile.png';

const Wrap = styled.div`
	background-color: var(--bg-section);
	padding: 120px 0;
	height: 980px;
	background-image: url(${vector});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 90px 0;
		height: 781px;
		background-image: url(${vectorTablet});
		background-position: center;
		background-repeat: no-repeat;
	}

	@media (max-width: 767px) {
		padding: 90px 0;
		height: 1017px;
		background-image: url(${vectorMobile});
		background-position: center;
		background-repeat: no-repeat;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
	text-align: center;
	margin-bottom: 80px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 40px;
		line-height: 46px;
		margin-bottom: 55px;
	}

	@media (max-width: 767px) {
		font-size: 40px;
		line-height: 46px;
		margin-bottom: 40px;
	}
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Item1 = styled.li`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	position: relative;
	display: inline-block;
	background-color: var(--bg-dark-white);
	border: 2px solid var(--color-white);
	padding: 30px 40px;
	border-radius: 20px;
	max-width: 500px;
	transform: rotate(-2deg);

	&::before {
		content: '';
		position: absolute;
		top: -92px;
		left: -333px;
		background-image: url(${step1});
		width: 339px;
		height: 196px;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
		left: 65px;
		padding: 30px;
		max-width: 406px;

		&::before {
			top: -46px;
			left: -197px;
			background-image: url(${step1tabl});
			width: 200px;
			height: 116px;
		}
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
		top: 72px;
		left: -29px;
		padding: 20px;
		max-width: 262px;

		&::before {
			content: '';
			position: absolute;
			top: -70px;
			left: 155px;
			background-image: url(${step1mob});
			width: 170px;
			height: 90px;
		}
	}
`;

const Item2 = styled.li`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	position: relative;
	right: 88px;
	top: 31px;
	display: inline-block;
	border: 2px solid var(--color-white);
	background-color: var(--bg-dark-white);
	padding: 30px 40px;
	border-radius: 20px;
	max-width: 614px;
	transform: rotate(4deg);

	&::after {
		content: '';
		position: absolute;
		top: -162px;
		right: -178px;
		background-image: url(${step2});
		width: 197px;
		height: 297px;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
		right: 25px;
		top: 18px;
		padding: 30px;
		max-width: 530px;

		&::after {
			top: -30px;
			right: -87px;
			background-image: url(${step2tabl});
			width: 105px;
			height: 158px;
		}
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
		right: -29px;
		top: 108px;
		padding: 20px;
		max-width: 262px;

		&::after {
			top: -16px;
			right: 246px;
			background-image: url(${step2mob});
			width: 81px;
			height: 122px;
		}
	}
`;

const Item3 = styled.li`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	position: relative;
	left: 88px;
	top: 70px;
	display: inline-block;
	border: 2px solid var(--color-white);
	background-color: var(--color-dark-blue);
	padding: 30px 40px;
	border-radius: 20px;
	max-width: 500px;
	color: var(--color-white);
	transform: rotate(-2deg);

	&::before {
		content: '';
		position: absolute;
		top: -47px;
		left: -220px;
		background-image: url(${step3});
		width: 293px;
		height: 266px;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
		left: -16px;
		top: 43px;
		padding: 30px;
		max-width: 400px;

		&::before {
			top: 27px;
			left: -116px;
			background-image: url(${step3tabl});
			width: 154px;
			height: 140px;
		}
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
		left: -30px;
		top: 141px;
		padding: 20px;
		max-width: 262px;

		&::before {
			top: -27px;
			left: 222px;
			background-image: url(${step3mob});
			width: 119px;
			height: 109px;
		}
	}
`;

const Step = styled.span`
	position: absolute;
	top: -22px;
	left: 40px;
	background-color: var(--color-orange);
	padding: 5px 16px;
	border-radius: 20px;
	font-weight: 700;
	font-size: 28px;
	line-height: 33.6px;
	color: var(--color-white);

	@media (min-width: 768px) and (max-width: 1259px) {
		top: -20px;
		left: 30px;
		font-size: 22px;
		line-height: 26.4px;
	}

	@media (max-width: 767px) {
		top: -20px;
		left: 20px;
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 155px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 90px;
	}

	@media (max-width: 767px) {
		margin-top: 245px;
	}
`;

const Btn = styled.button`
	display: inline-block;
	padding: 20px 56px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
	background-color: var(--color-accent);
	border-radius: 30px;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}

	@media (max-width: 767px) {
		padding: 14px 36px;
		border-radius: 30px;
		font-weight: 600;
		font-size: 20px;
		line-height: 24px;
	}
`;

const HowItWorks = () => {
	const {
		isRegisterModalOpen,
		isLoginModalOpen,
		setIsRegisterModalOpen,
		setIsLoginModalOpen,
		openLogin,
		openRegister,
		handleRegisterClick,
	} = useAuthModals();
	const { isMobile } = useResponsive();

	return (
		<Wrap>
			<Container style={{ display: 'flex', flexDirection: 'column' }}>
				<Title>How it works</Title>

				<List>
					<Item1>
						<Step>Step 1</Step>
						Sign up — it's quick and easy. Read fun posts and watch
						interesting videos.
					</Item1>

					<Item2>
						<Step style={{ left: isMobile ? '143px' : '' }}>
							Step 2
						</Step>
						Like, comment, and chat with children from other
						countries. Share your ideas and learn new words.
					</Item2>

					<Item3>
						<Step>Step 3</Step>
						Get support from others, grow your confidence, enjoy
						learning and making friends.
					</Item3>
				</List>

				<BtnBox>
					<Btn onClick={handleRegisterClick}>Register</Btn>
				</BtnBox>
			</Container>

			{isRegisterModalOpen && (
				<Register
					isVisible={isRegisterModalOpen}
					onClose={() => setIsRegisterModalOpen(false)}
					openLogin={openLogin}
				/>
			)}
			{isLoginModalOpen && (
				<Login
					isVisible={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
					openRegister={openRegister}
				/>
			)}
		</Wrap>
	);
};

export default HowItWorks;
