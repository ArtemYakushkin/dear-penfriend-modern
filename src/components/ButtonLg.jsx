import styled from 'styled-components';

const Button = styled.button`
	padding: 14px 36px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	width: fit-content;
	transition: var(--transition-btn);

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 10px 26px;
		border-radius: 30px;
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		padding: 10px 26px;
		border-radius: 30px;
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
	}
`;

const ButtonLg = ({ onClick, text, style }) => {
	return (
		<Button onClick={onClick} style={style}>
			{text}
		</Button>
	);
};

export default ButtonLg;
