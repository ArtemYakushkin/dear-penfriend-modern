import styled from 'styled-components';

import avatarFalce from '../assets/avatarFalce.png';

const Wrap = styled.div`
	border-radius: 50%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-accent);
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Initial = styled.div`
	font-weight: 700;
	font-size: 32px;
	color: var(--color-white);

	@media (max-width: 767px) {
		font-size: 28px;
	}
`;

const Avatar = ({ photo, name, onClick, style }) => {
	return (
		<Wrap style={style} onClick={onClick}>
			{photo ? (
				<img src={photo || avatarFalce} alt="avatar" />
			) : (
				<Initial>{name ? name.charAt(0).toUpperCase() : 'U'}</Initial>
			)}
		</Wrap>
	);
};

export default Avatar;
