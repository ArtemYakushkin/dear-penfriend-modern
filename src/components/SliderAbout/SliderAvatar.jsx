import styled from 'styled-components';

import avatar1 from '../../assets/Slider/avatar1.png';
import avatar2 from '../../assets/Slider/avatar2.png';
import avatar3 from '../../assets/Slider/avatar3.png';
import { GoPlus } from 'react-icons/go';

const Avatars = styled.div`
	position: relative;
	max-height: 64px;
	max-width: 168px;
	display: inline-block;
	height: auto;
	display: flex;
	align-items: center;
	padding: 12px 16px;
	border-radius: 50px;
	background: linear-gradient(100.42deg, rgba(47, 123, 247, 0.5) 16.09%, rgba(47, 123, 246, 0.1) 105.27%);
	backdrop-filter: blur(5px);
	margin-bottom: 23px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 20px;
		margin-right: 20px;
		margin-left: auto;
	}

	@media (max-width: 767px) {
		position: absolute;
		max-height: 45px;
		max-width: 114px;
		padding: 8px 10px;
		margin-bottom: 0px;

		.sliderAvatars-slide1 {
			bottom: 0;
			right: 46px;
		}
	}
`;

const Add = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1px solid var(--color-white);
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 767px) {
		width: 28px;
		height: 28px;
	}
`;

const Photo = styled.div`
	z-index: 1;
	margin-left: -8px;
`;

const SliderAvatar = ({ style }) => {
	return (
		<Avatars style={style}>
			<Add>
				<GoPlus size={32} color="var(--color-white)" />
			</Add>
			<Photo>
				<img src={avatar1} alt="" />
			</Photo>
			<Photo>
				<img src={avatar2} alt="" />
			</Photo>
			<Photo>
				<img src={avatar3} alt="" />
			</Photo>
		</Avatars>
	);
};

export default SliderAvatar;
