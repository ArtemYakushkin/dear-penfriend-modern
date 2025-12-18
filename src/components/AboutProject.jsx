import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePlayCircleOutline } from 'react-icons/md';
import styled from 'styled-components';

import Register from './Register';
import Login from './Login';
import ButtonHigh from './ButtonHigh';
import poster from '../assets/Video/Cover_video.png';
import video from '../assets/Video/Promo_Dear_Penfriend.mp4';
import Vector1 from '../assets/Vectors/about-vector-1.png';
import Vector2 from '../assets/Vectors/about-vector-2.png';

import { useAuthModals } from '../hooks/useAuthModals';
import { useResponsive } from '../hooks/useResponsive';
import { Container } from '../style/Container';

const About = styled.div`
	position: relative;
	background-color: var(--bg-mode);
	padding: 120px 0;
	background-image: url(${Vector1}), url(${Vector2});
	background-repeat: no-repeat, no-repeat;
	background-position: left bottom, right 100px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 90px 0;
		background-image: none, url(${Vector2});
		background-repeat: no-repeat, no-repeat;
		background-position: left bottom, right 100px;
	}

	@media (max-width: 767px) {
		padding: 90px 0;
		background-image: none;
	}
`;

const AboutTitle = styled.h2`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
	margin-bottom: 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 40px;
		line-height: 46px;
		text-align: center;
		margin-bottom: 52px;
	}

	@media (max-width: 767px) {
		text-align: center;
		margin-bottom: 34px;
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const AboutVideoContainer = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	border-radius: 30px;
	overflow: hidden;
	background-color: transparent;

	video {
		width: 100%;
		object-fit: cover;
	}

	button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: var(--color-black-light-change);
		color: var(--color-white);
	}

	@media (max-width: 767px) {
		button {
			width: 60px;
			height: 60px;
		}
	}
`;

const AboutBtnBox = styled.div`
	display: flex;
	justify-content: center;
	gap: 16px;
	margin-top: 82px;

	@media (min-width: 768px) and (max-width: 1259px) {
		flex-direction: column;
		align-items: center;
		margin-top: 93px;
	}

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: center;
		margin-top: 42px;
	}
`;

const AboutProject = () => {
	const {
		isRegisterModalOpen,
		isLoginModalOpen,
		setIsRegisterModalOpen,
		setIsLoginModalOpen,
		openLogin,
		openRegister,
		handleRegisterClick,
	} = useAuthModals();
	const [isPlaying, setIsPlaying] = useState(false);
	const navigate = useNavigate();
	const videoRef = useRef(null);

	const { isMobile } = useResponsive();

	useEffect(() => {
		const videoElement = videoRef.current;

		const handleVideoPlay = () => setIsPlaying(true);
		const handleVideoPause = () => setIsPlaying(false);
		const handleVideoEnd = () => {
			setIsPlaying(false);
			videoElement.currentTime = 0;
		};

		videoElement.addEventListener('play', handleVideoPlay);
		videoElement.addEventListener('pause', handleVideoPause);
		videoElement.addEventListener('ended', handleVideoEnd);

		return () => {
			videoElement.removeEventListener('play', handleVideoPlay);
			videoElement.removeEventListener('pause', handleVideoPause);
			videoElement.removeEventListener('ended', handleVideoEnd);
		};
	}, []);

	const handlePlay = () => {
		setIsPlaying(true);
		videoRef.current.play();
	};

	return (
		<About>
			<Container>
				<AboutTitle>About the project</AboutTitle>

				<AboutVideoContainer>
					<video
						ref={videoRef}
						src={video}
						poster={poster}
						controls={isPlaying}
					/>
					{!isPlaying && (
						<button onClick={handlePlay}>
							<MdOutlinePlayCircleOutline
								size={isMobile ? '60' : '100'}
							/>
						</button>
					)}
				</AboutVideoContainer>
				<AboutBtnBox>
					<ButtonHigh
						text={'Learn more about project'}
						onClick={() => navigate('/about')}
						style={{
							backgroundColor: 'transparent',
							border: '1px solid var(--color-accent-change)',
							color: 'var(--color-accent-change)',
						}}
					/>
					<ButtonHigh
						text={'Register and start chatting'}
						onClick={handleRegisterClick}
					/>
				</AboutBtnBox>
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
		</About>
	);
};

export default AboutProject;
