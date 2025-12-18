import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';

import {
	MdOutlineArrowBackIos,
	MdOutlineArrowForwardIos,
} from 'react-icons/md';

const Media = styled(Swiper)`
	position: relative;
	width: 100%;
	height: 100%;
`;

const MediaPagination = styled.div`
	position: absolute;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	bottom: 5px !important;
	left: 50% !important;
	transform: translateX(-50%);
	background: #2f7bf633;
	padding: 2px 8px;
	border-radius: 6px;
	width: auto !important;
`;

const MediaBullet = styled.div`
	&.media-bullet {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #ffffffb2;
		opacity: 0.7;
		cursor: pointer;
	}

	&.media-bullet-active {
		background-color: #2f7bf6;
		opacity: 1;
		cursor: pointer;
	}
`;

const MediaButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #2f7bf659;
	z-index: 10;
	cursor: pointer;

	&.in-activ {
		background-color: #2f7bf64d;
	}

	&.media-button-prev {
		left: 8px;
	}

	&.media-button-next {
		right: 8px;
	}

	&.media-button-disabled {
		cursor: none;
	}

	@media (max-width: 767px) {
		display: none;
	}
`;

const MediaCarousel = ({ media }) => {
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const swiperRef = useRef(null);
	const paginationRef = useRef(null);
	const nextButtonRef = useRef(null);
	const prevButtonRef = useRef(null);

	const handleSlideChange = (swiper) => {
		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);
		setActiveIndex(swiper.activeIndex);
	};

	if (!Array.isArray(media) || media.length === 0) return null;

	if (media.length === 1) {
		const single = media[0];
		return single.includes('.mp4') ? (
			<video autoPlay loop>
				<source src={single} type="video/mp4" />
				Your browser does not support video.
			</video>
		) : (
			<img src={single} alt="Post media" />
		);
	}

	return (
		<Media
			onSwiper={(swiper) => (swiperRef.current = swiper)}
			onInit={(swiper) => {
				swiperRef.current = swiper;
				swiper.params.navigation.prevEl = prevButtonRef.current;
				swiper.params.navigation.nextEl = nextButtonRef.current;
				swiper.params.pagination.el = paginationRef.current;
				swiper.navigation.init();
				swiper.navigation.update();
				swiper.pagination.init();
				swiper.pagination.update();
			}}
			onSlideChange={handleSlideChange}
			spaceBetween={10}
			slidesPerView={1}
			pagination={{
				clickable: true,
				el: paginationRef.current,
				bulletClass: 'media-bullet',
				bulletActiveClass: 'media-bullet-active',
			}}
			navigation={{
				nextEl: nextButtonRef.current,
				prevEl: prevButtonRef.current,
			}}
			modules={[Pagination, Navigation]}
			className="media"
		>
			{media.map((url, index) => (
				<SwiperSlide key={index}>
					{url.includes('.mp4') ? (
						<video autoPlay loop>
							<source src={url} type="video/mp4" />
							Your browser does not support video.
						</video>
					) : (
						<img src={url} alt={`Post media ${index}`} />
					)}
				</SwiperSlide>
			))}

			<MediaPagination ref={paginationRef}>
				{media.map((_, index) => (
					<MediaBullet
						key={index}
						className={`media-bullet ${
							activeIndex === index ? 'media-bullet-active' : ''
						}`}
						onClick={() => swiperRef.current?.slideTo(index)}
					></MediaBullet>
				))}
			</MediaPagination>

			<MediaButton
				ref={prevButtonRef}
				className={`media-button-prev ${
					isBeginning ? 'media-button-disabled' : ''
				}`}
				disabled={isBeginning}
			>
				<MdOutlineArrowBackIos
					size={18}
					style={{
						color: 'var(--color-white)',
						opacity: isBeginning ? '0.3' : '1',
					}}
				/>
			</MediaButton>
			<MediaButton
				ref={nextButtonRef}
				className={`media-button-next ${
					isEnd ? 'media-button-disabled' : ''
				}`}
				disabled={isEnd}
			>
				<MdOutlineArrowForwardIos
					size={18}
					style={{
						color: 'var(--color-white)',
						opacity: isEnd ? '0.3' : '1',
					}}
				/>
			</MediaButton>
		</Media>
	);
};

export default MediaCarousel;
