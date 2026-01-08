import { useContext } from 'react';
import styled from 'styled-components';

import ButtonMain from './Buttons/ButtonMain';
import { useResponsive } from '../hooks/useResponsive';
import { ThemeContext } from '../context/ThemeContext';

import Map from '../assets/Hero/Main_image.png';
import MapTablet from '../assets/Hero/Main_image-tablet.png';
import MapMobile from '../assets/Hero/Main_image-mobile.png';
import MapDark from '../assets/Hero/Main_image_dark.png';
import MapTabletDark from '../assets/Hero/Main_image-tablet-dark.png';
import MapMobileDark from '../assets/Hero/Main_image-mobile-dark.png';

import { Container } from '../style/Container';

const Wrapper = styled.div`
	display: flex;
	padding: 35px 0px 0px 0px;
	margin-bottom: 45px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 0px;
		margin-bottom: 30px;
	}

	@media (max-width: 767px) {
		margin-bottom: 40px;
		padding: 0;
		margin-top: 100px;
		flex-direction: column-reverse;
	}
`;

const Content = styled.div`
	margin-top: 50px;
	margin-bottom: 57px;
	max-width: 514px;
	flex: 1;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 23px;
		margin-bottom: 0px;
		max-width: 328px;
	}

	@media (max-width: 767px) {
		margin: 0;
		margin-top: -40px;
		width: 100%;
	}
`;

const Title = styled.h1`
	margin-bottom: 20px;
	font-weight: 700;
	font-size: 85px;
	line-height: 93.5px;
	color: var(--color-accent-change);

	span {
		display: inline-block;
		width: 260px;
		height: 92px;
		border: 3px solid var(--color-yellow);
		border-radius: 100px;
		color: var(--color-yellow);
		text-align: center;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 0px;
		font-size: 50px;
		line-height: 60px;

		span {
			width: 156px;
			height: 55px;
			border: 2px solid var(--color-yellow);
			border-radius: 60px;
		}
	}

	@media (max-width: 767px) {
		width: 100%;
		margin-bottom: 31px;
		text-align: center;
		font-size: 50px;
		line-height: 60px;

		span {
			width: 156px;
			height: 55px;
			border: 2px solid var(--color-yellow);
			border-radius: 60px;
		}
	}
`;

const Text = styled.p`
	max-width: 487px;
	margin-bottom: 23px;
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		max-width: 325px;
		margin-bottom: 28px;
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		width: 100%;
		text-align: center;
		font-size: 20px;
		line-height: 25px;
	}
`;

const BtnBox = styled.div`
	@media (max-width: 767px) {
		display: flex;
		justify-content: center;
	}
`;

const Image = styled.div`
	position: relative;
	width: 686px;
	flex: 1;

	img {
		margin-top: 15px;
		width: 100%;
		height: auto;
		transform: scale(1.2);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		position: relative;
		width: 352px;
		flex: 1;

		img {
			width: 100%;
			height: auto;
			transform: scale(1.1);
		}
	}

	@media (max-width: 767px) {
		width: 100%;
		flex: 1;

		img {
			margin-top: 0;
			width: 100%;
			height: auto;
			transform: scale(1.1);
		}
	}
`;

const Hero = () => {
	const { isMobile, isTablet } = useResponsive();
	const { theme } = useContext(ThemeContext);

	const getImage = () => {
		if (theme === 'dark') {
			if (isMobile) return MapMobileDark;
			if (isTablet) return MapTabletDark;
			return MapDark;
		} else {
			if (isMobile) return MapMobile;
			if (isTablet) return MapTablet;
			return Map;
		}
	};

	return (
		<Container>
			<Wrapper>
				<Content>
					<Title>
						Chat, <span>learn,</span> make friends
					</Title>
					<Text>Read interesting posts, write your stories, and comment.</Text>
					<BtnBox>
						<ButtonMain />
					</BtnBox>
				</Content>

				<Image>
					<img src={getImage()} alt="Hero map" />
				</Image>
			</Wrapper>
		</Container>
	);
};

export default Hero;
