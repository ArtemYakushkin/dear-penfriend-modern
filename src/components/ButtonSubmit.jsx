import styled from 'styled-components';

const Button = styled.button`
	width: 100%;
	background-color: var(--color-accent);
	padding: 14px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
	transition: var(--transition-btn);

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}
`;

const ButtonSubmit = ({ text, style, onClick }) => {
	return (
		<Button
			className="btn-submit"
			type="submit"
			style={style}
			onClick={onClick}
		>
			{text}
		</Button>
	);
};

export default ButtonSubmit;
