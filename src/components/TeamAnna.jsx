import styled from 'styled-components';

import instagram from '../assets/SocialIcon/instagram.png';
import telegram from '../assets/SocialIcon/telegram.png';
import linkedin from '../assets/SocialIcon/linkedin.png';
import Anna from '../assets/Team/Anna.png';

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
		height: 662px;
	}
`;

const Image = styled.div`
	position: relative;
	width: 100%;
	height: 355px;
	background-color: var(--color-green);
	border-bottom-left-radius: 200px;
	border-bottom-right-radius: 200px;
	margin-top: 69px;

	&::after {
		position: absolute;
		content: '';
		width: 51px;
		height: 51px;
		border-radius: 50%;
		background-color: var(--color-green);
		top: -69px;
		right: 0;
	}

	img {
		position: absolute;
		bottom: 0;
		left: 0px;
		width: 100%;
		height: 409px;
		overflow: hidden;
		border-bottom-left-radius: 200px;
		border-bottom-right-radius: 200px;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 267px;
		background-color: var(--color-green);
		border-bottom-left-radius: 200px;
		border-bottom-right-radius: 200px;
		margin-top: 52px;

		&::after {
			width: 38px;
			height: 38px;
			top: -52px;
			right: 0;
		}

		img {
			position: absolute;
			bottom: 0;
			left: 0px;
			width: 100%;
			height: 321px;
		}
	}

	@media (max-width: 767px) {
		height: 411px;
		margin-top: 81px;

		&::after {
			top: -81px;
		}

		img {
			position: absolute;
			bottom: 0;
			left: 0px;
			width: 100%;
			height: 465px;
			overflow: hidden;
			border-bottom-left-radius: 200px;
			border-bottom-right-radius: 200px;
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

const TeamAnna = () => {
	return (
		<Item>
			<Image>
				<img src={Anna} alt="Anna" />
			</Image>
			<Name>Anna Yakushkina</Name>
			<Description>
				Project Author. English teacher and methodologist. Creates posts
				and ideas for students on this website.
			</Description>
			<Contacts>
				<SubTitle>Contacts:</SubTitle>
				<a
					href="https://www.linkedin.com/in/anna-yakushkina-3011202a9"
					target="_blank"
					rel="noreferrer"
				>
					<img src={linkedin} alt="" />
				</a>
				<a
					href="https://www.instagram.com/start_english_today?igsh=MTdxdGJsZnQ1YWNxbQ=="
					target="_blank"
					rel="noreferrer"
				>
					<img src={instagram} alt="" />
				</a>
				<a
					href="tg://resolve?domain=AnnaYakushkina"
					target="_blank"
					rel="noreferrer"
				>
					<img src={telegram} alt="" />
				</a>
			</Contacts>
		</Item>
	);
};

export default TeamAnna;
