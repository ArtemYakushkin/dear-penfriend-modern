import styled from 'styled-components';

import instagram from '../../assets/SocialIcon/instagram.png';
import telegram from '../../assets/SocialIcon/telegram.png';
import linkedin from '../../assets/SocialIcon/linkedin.png';
import Artem from '../../assets/Team/Artem.png';

const Item = styled.div`
	min-width: 282px;
	height: 618px;
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) and (max-width: 1259px) {
		min-width: 212px;
		height: 538px;
	}

	@media (max-width: 767px) {
		min-width: 327px;
		height: 640px;
	}
`;

const Image = styled.div`
	position: relative;
	width: 100%;
	height: 406px;
	background-color: var(--color-yellow);
	border-top-left-radius: 200px;
	border-top-right-radius: 200px;
	border-bottom-left-radius: 200px;
	margin-top: 18px;

	&::after {
		position: absolute;
		content: '';
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background-color: var(--color-yellow);
		bottom: 30px;
		right: -17px;
	}

	img {
		position: absolute;
		bottom: 0;
		left: 0px;
		width: 100%;
		height: 406px;
		overflow: hidden;
		border-top-left-radius: 200px;
		border-top-right-radius: 200px;
		border-bottom-left-radius: 200px;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 305px;
		margin-top: 16px;

		&::after {
			width: 25px;
			height: 25px;
			bottom: 30px;
			right: -12px;
		}

		img {
			height: 305px;
		}
	}

	@media (max-width: 767px) {
		height: 471px;
		margin-top: 0px;

		&::after {
			width: 40px;
			height: 40px;
			bottom: 35px;
			right: -20px;
		}

		img {
			height: 471px;
		}
	}
`;

const Name = styled.h4`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);
	text-align: center;
	margin-top: 20px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
		margin-top: 26px;
	}

	@media (max-width: 767px) {
		font-size: 20px;
		line-height: 25px;
	}
`;

const Description = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);
	text-align: center;
	margin-top: 10px;
`;

const Contacts = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-top: auto;

	@media (min-width: 768px) and (max-width: 1259px) {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: auto;
	}

	@media (max-width: 767px) {
		margin-top: 20px;
	}
`;

const SubTitle = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-light);
`;

const TeamArtem = () => {
	return (
		<Item>
			<Image>
				<img src={Artem} alt="Artem" />
			</Image>
			<Name>Artem Yakushkin</Name>
			<Description>
				Site Developer. Builds the website and makes it work. Plans, codes, and improves the platform.
			</Description>
			<Contacts>
				<SubTitle>Contacts:</SubTitle>
				<a href="https://www.linkedin.com/in/artem-yakushkin-a86722229/" target="_blank" rel="noreferrer">
					<img src={linkedin} alt="" />
				</a>
				<a href="https://www.instagram.com/yakushkin_artem_/" target="_blank" rel="noreferrer">
					<img src={instagram} alt="" />
				</a>
				<a href="tg://resolve?domain=ArtemYakushkin" target="_blank" rel="noreferrer">
					<img src={telegram} alt="" />
				</a>
			</Contacts>
		</Item>
	);
};

export default TeamArtem;
