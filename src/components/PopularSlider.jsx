import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from 'styled-components';

import { useResponsive } from '../hooks/useResponsive';
import PopularCard from './PopularCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const BtnPrev = styled.button`
	position: absolute;
	left: -67px;
	top: 50%;
	transform: translateY(-50%);
	padding-right: 5px;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background-color: #2f7bf659;
	color: var(--color-white);
	display: flex;
	align-items: center;
	justify-content: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		left: -35px;
		padding-right: 0px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: transparent;
	}

	@media (max-width: 767px) {
		left: -15px;
		width: 32px;
		height: 32px;
		z-index: 20;
	}
`;

const BtnNext = styled.button`
	position: absolute;
	right: -67px;
	top: 50%;
	transform: translateY(-50%);
	padding-left: 5px;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background-color: #2f7bf659;
	color: var(--color-white);
	display: flex;
	align-items: center;
	justify-content: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		right: -35px;
		padding-left: 0px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: transparent;
	}

	@media (max-width: 767px) {
		width: 32px;
		height: 32px;
		z-index: 20;
		right: -15px;
	}
`;

const PopularSlider = ({ posts, authors, onPostClick }) => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const swiperRef = useRef(null);
	const { isMobile, isTablet } = useResponsive();

	useEffect(() => {
		if (!swiperRef.current) return;
		swiperRef.current.params.navigation.prevEl = prevRef.current;
		swiperRef.current.params.navigation.nextEl = nextRef.current;
		swiperRef.current.navigation.init();
		swiperRef.current.navigation.update();
	}, [posts]);

	return (
		<div style={{ position: 'relative' }}>
			<Swiper
				modules={[Navigation]}
				loop
				spaceBetween={20}
				slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
				className="popular-slider"
			>
				{posts.map((post) => (
					<SwiperSlide key={post.id}>
						<PopularCard
							post={post}
							author={authors[post.author?.uid]}
							onClick={() => onPostClick(post.id)}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<BtnPrev ref={prevRef}>
				<IoIosArrowBack size={32} />
			</BtnPrev>

			<BtnNext ref={nextRef}>
				<IoIosArrowForward size={32} />
			</BtnNext>
		</div>
	);
};

export default PopularSlider;
