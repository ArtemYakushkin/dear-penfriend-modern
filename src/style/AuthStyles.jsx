import styled from 'styled-components';

export const Auth = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	z-index: 1000;
	opacity: 0;
	transition: opacity 5s ease-in-out;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--bg-auth);
		opacity: 0.85;
		z-index: -1;
	}

	${({ $isVisible }) =>
		$isVisible &&
		`
		opacity: 1;
		pointer-events: all;
	`}
`;

export const AuthForm = styled.form`
	position: relative;
	width: 684px;
	max-height: 90vh;
	background-color: var(--bg-auth-form);
	background-image: var(--bg-auth-background);
	box-shadow: var(--shadow-auth-modal);
	z-index: 1;
	padding: 40px;
	border-radius: 30px;
	display: flex;
	flex-direction: column;
	transform: scale(0.1);
	transition: transform 5s ease-out, opacity 5s ease-out;
	opacity: 0;

	${({ $isVisible }) =>
		$isVisible &&
		`
		transform: scale(1);
		opacity: 1;
	`}

	@media (max-width: 767px) {
		width: 100%;
		max-width: 375px;
		max-height: 90vh;
		padding: 40px 24px 40px 24px;
	}
`;

export const AuthScroll = styled.div`
	position: relative;
	overflow-y: auto;
	max-height: 100%;
	padding-right: 10px;
`;

export const AuthTitle = styled.h3`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	margin-bottom: 20px;

	@media (max-width: 767px) {
		font-size: 28px;
		line-height: 33.6px;
	}
`;

export const AuthWrap = styled.div`
	display: flex;
	gap: 16px;
	margin-bottom: 30px;

	@media (max-width: 767px) {
		flex-direction: column;
		gap: 30px;
	}
`;

export const AuthBase = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 69.5%;

	@media (max-width: 767px) {
		width: 100%;
	}
`;

export const AuthSecondary = styled.div`
	width: 30.5%;
	display: flex;
	flex-direction: column;
	gap: 6px;

	@media (max-width: 767px) {
		width: 186px;
	}
`;

export const AuthUploadText = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);
`;

export const AuthUploadSubtext = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);
`;

export const AuthSuccess = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-green);
	text-align: center;
	margin-bottom: 12px;
`;

export const AuthError = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-red);
	text-align: center;
	margin-bottom: 12px;
`;

export const AuthLinkBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	margin-bottom: 30px;

	@media (max-width: 767px) {
		justify-content: flex-start;
	}
`;

export const AuthLinkText = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-light);
`;

export const AuthLinkTextAccent = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	text-decoration: underline;
	color: var(--color-accent);
	cursor: pointer;
`;

export const AuthPrivacyText = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);

	span {
		text-decoration: underline;
		cursor: pointer;
	}
`;

export const AuthRemember = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
`;

export const AuthForgot = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);
	cursor: pointer;
`;

export const AuthRecoverList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 30px;
`;

export const AuthRecoverItem = styled.ul`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);
`;
