import styled from 'styled-components';

const Button = styled.button`
	padding: 20px 56px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	border: 1px solid var(--color-accent);
	background-color: var(--color-accent);
	color: var(--color-white);

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	@media (max-width: 767px) {
		padding: 10px 26px;
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
	}
`;

const ButtonHigh = ({ onClick, text, style }) => {
	return (
		<Button onClick={onClick} style={style}>
			{text}
		</Button>
	);
};

export default ButtonHigh;
