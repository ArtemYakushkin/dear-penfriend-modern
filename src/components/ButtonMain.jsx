import styled from 'styled-components';

const LinkToolbar = styled.a`
	display: inline-block;
	padding: 20px 56px;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
	background-color: var(--color-accent);
	border-radius: 30px;

	&:hover {
		box-shadow: 0px 4px 4px 0px #2f7bf640;
	}

	&:active {
		background-color: var(--color-dark-blue);
	}
`;

const ButtonMain = () => {
	return <LinkToolbar href="#toolbar">Get started</LinkToolbar>;
};

export default ButtonMain;
