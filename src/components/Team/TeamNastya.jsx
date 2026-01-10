import styled from 'styled-components';

import whatsapp from '../../assets/SocialIcon/whatsapp.png';
import telegram from '../../assets/SocialIcon/telegram.png';
import linkedin from '../../assets/SocialIcon/linkedin.png';
import Nastya from '../../assets/Team/Nastya.png';

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
		height: 644px;
	}
`;

const Image = styled.div`
	position: relative;
	width: 100%;
	height: 354px;
	background-color: var(--bg-mode);
	border-bottom-left-radius: 200px;
	border-bottom-right-radius: 200px;
	margin-top: 70px;

	&::after {
		position: absolute;
		content: '';
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background-color: var(--bg-mode);
		top: 77px;
		right: -58px;
	}

	img {
		position: absolute;
		bottom: 0;
		left: 0px;
		width: 100%;
		height: 423px;
		overflow: hidden;
		border-bottom-left-radius: 200px;
		border-bottom-right-radius: 200px;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 265px;
		margin-top: 56px;

		&::after {
			width: 25px;
			height: 25px;
			top: 57px;
			right: -32px;
		}

		img {
			height: 315px;
		}
	}

	@media (max-width: 767px) {
		height: 413px;

		&::after {
			position: absolute;
			content: '';
			width: 29px;
			height: 29px;
			border-radius: 50%;
			background-color: var(--bg-mode);
			top: 380px;
			left: 0px;
		}

		img {
			height: 482px;
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

const TeamNastya = () => {
	return (
		<Item>
			<Image>
				<img src={Nastya} alt="Nastya" />
			</Image>
			<Name>Anastasia Horbatenko</Name>
			<Description>
				UI/UX Designer. Creates the look and feel of the site. Thinks about what users need and designs every
				detail.
			</Description>
			<Contacts>
				<SubTitle>Contacts:</SubTitle>
				<a href="https://linkedin.com/in/anastasiia-horbatenko-designer/" target="_blank" rel="noreferrer">
					<img src={linkedin} alt="" />
				</a>
				<a href="tg://resolve?domain=StasiaGor" target="_blank" rel="noreferrer">
					<img src={telegram} alt="" />
				</a>
				<a href="https://wa.me/+380663611504" target="_blank" rel="noreferrer">
					<img src={whatsapp} alt="" />
				</a>
			</Contacts>
		</Item>
	);
};

export default TeamNastya;
