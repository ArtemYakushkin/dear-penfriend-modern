import styled from 'styled-components';

const Button = styled.button`
	padding: 10px 26px;
	border-radius: 30px;
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	background-color: var(--color-accent);
	color: var(--color-white);
	transition: all 0.25s;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		position: relative;
		background-color: transparent;
		border-radius: 0px;
		padding: 0px;
		font-family: 'Nunito Sans', sans-serif;
		color: var(--color-accent);

		&::after {
			content: '';
			position: absolute;
			bottom: -1px;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: var(--color-accent);
		}

		&:hover {
			box-shadow: none;
		}

		&:active {
			background-color: transparent;
		}
	}
`;

const ButtonSmall = ({ text, onClick }) => {
	return <Button onClick={onClick}>{text}</Button>;
};

export default ButtonSmall;
