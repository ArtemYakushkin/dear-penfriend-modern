import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
`;

const LoaderSpin = styled.div`
	border: 16px solid var(--color-accent);
	border-top: 16px solid var(--color-dark-blue);
	border-radius: 50%;
	width: 80px;
	height: 80px;
	animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
	return (
		<LoaderContainer>
			<LoaderSpin></LoaderSpin>
		</LoaderContainer>
	);
};

export default Loader;
