import { useState } from 'react';
import styled from 'styled-components';

import { useAuthModals } from '../hooks/useAuthModals';
import { useResponsive } from '../hooks/useResponsive';
import SliderMobile from './SliderMobile';
import SliderTablet from './SliderTablet';
import SliderDesk from './SliderDesk';
import Register from './Register';
import Login from './Login';
import { Container } from '../style/Container';

import Vector from '../assets/Vectors/slider-vector.png';
import VectorTablet from '../assets/Vectors/slider-vector-tablet.png';

import {
	MdOutlineArrowBackIos,
	MdOutlineArrowForwardIos,
} from 'react-icons/md';

const SliderWrap = styled.div`
	position: relative;
	padding: 120px 0 120px 0;
	background-color: var(--bg-mode);
	background-image: url(${Vector});
	background-size: cover;
	background-repeat: no-repeat;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 90px 0 114px 0;
		background-image: url(${VectorTablet});
		background-size: cover;
		background-repeat: no-repeat;
	}

	@media (max-width: 767px) {
		padding: 60px 0 60px 0;
		background-image: none;
		margin-top: 81px;
	}
`;

const SliderInner = styled.div`
	position: relative;
	width: 100%;
	height: auto;
	margin: auto;
	z-index: 2;
`;

const Slides = styled.div`
	position: relative;
	width: 100%;
	min-height: 529px;

	@media (min-width: 768px) and (max-width: 1259px) {
		min-height: 570px;
	}

	@media (max-width: 767px) {
		min-height: 740px;
	}
`;

const BtnPrev = styled.button`
	position: absolute;
	left: -67px;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background-color: #2f7bf64d;
	z-index: 10;

	&:hover {
		background-color: #2f7bf659;
	}
`;

const BtnNext = styled.button`
	position: absolute;
	right: -67px;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background-color: #2f7bf64d;
	z-index: 10;

	&:hover {
		background-color: #2f7bf659;
	}
`;

const Pagination = styled.div`
	position: absolute;
	right: 290px;
	bottom: -20px;
	display: flex;
	gap: 16px;

	@media (min-width: 768px) and (max-width: 1259px) {
		position: absolute;
		right: 0;
		left: 50%;
		bottom: -20px;
		display: flex;
		gap: 16px;
	}

	@media (max-width: 767px) {
		position: absolute;
		right: 130px;
		top: 422px;
		bottom: 0px;
		display: flex;
		gap: 16px;
	}
`;

const Dot = styled.span`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #2f7bf64d;

	&.slider-dot-active {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-accent);
	}
`;

const Slider = () => {
	const {
		isRegisterModalOpen,
		isLoginModalOpen,
		setIsRegisterModalOpen,
		setIsLoginModalOpen,
		openLogin,
		openRegister,
		handleRegisterClick,
	} = useAuthModals();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [touchStartX, setTouchStartX] = useState(null);
	const [touchEndX, setTouchEndX] = useState(null);
	const { isMobile, isTablet } = useResponsive();
	const SlidesComponent = isMobile
		? SliderMobile
		: isTablet
		? SliderTablet
		: SliderDesk;
	const slideCount = SlidesComponent.count;

	const handlePrev = () => {
		setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
	};

	const handleNext = () => {
		setCurrentSlide((prev) => (prev === slideCount - 1 ? prev : prev + 1));
	};

	const handleTouchStart = (e) => {
		setTouchStartX(e.touches[0].clientX);
		setTouchEndX(null);
	};

	const handleTouchMove = (e) => {
		setTouchEndX(e.touches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (touchStartX && touchEndX) {
			const deltaX = touchStartX - touchEndX;
			if (deltaX > 50) {
				handleNext();
			} else if (deltaX < -50) {
				handlePrev();
			}
		}
		setTouchStartX(null);
		setTouchEndX(null);
	};

	return (
		<SliderWrap
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<Container style={{ position: 'relative' }}>
				<SliderInner>
					<Slides>
						{isMobile ? (
							<SliderMobile
								currentSlide={currentSlide}
								handleRegisterClick={handleRegisterClick}
							/>
						) : isTablet ? (
							<SliderTablet
								currentSlide={currentSlide}
								handleRegisterClick={handleRegisterClick}
							/>
						) : (
							<SliderDesk
								currentSlide={currentSlide}
								handleRegisterClick={handleRegisterClick}
							/>
						)}
					</Slides>

					{!(isMobile || isTablet) && (
						<>
							<BtnPrev
								onClick={handlePrev}
								disabled={currentSlide === 0}
								style={{
									opacity: currentSlide === 0 ? 0.5 : 1,
									cursor:
										currentSlide === 0
											? 'default'
											: 'pointer',
								}}
							>
								<MdOutlineArrowBackIos
									size={22}
									style={{ color: 'var(--color-white)' }}
								/>
							</BtnPrev>
							<BtnNext
								onClick={handleNext}
								disabled={currentSlide === slideCount - 1}
								style={{
									opacity:
										currentSlide === slideCount - 1
											? 0.5
											: 1,
									cursor:
										currentSlide === slideCount - 1
											? 'default'
											: 'pointer',
								}}
							>
								<MdOutlineArrowForwardIos
									size={22}
									style={{ color: 'var(--color-white)' }}
								/>
							</BtnNext>
						</>
					)}

					<Pagination>
						{Array.from({ length: slideCount }).map((_, index) => (
							<Dot
								className={`${
									currentSlide === index
										? 'slider-dot-active'
										: ''
								}`}
								key={index}
								onClick={() => setCurrentSlide(index)}
							></Dot>
						))}
					</Pagination>
				</SliderInner>
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
		</SliderWrap>
	);
};

export default Slider;
