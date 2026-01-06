import styled from 'styled-components';

export const InputGroup = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const InputContainer = styled.div`
	width: 100%;
	height: 54px;
`;

export const InputMain = styled.input`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-light-change);
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background-color: var(--bg-auth-input);
	border: 1px solid var(--bg-auth-input);

	&:hover {
		background-color: var(--bg-hover-unchange);
	}

	&:focus {
		background-color: var(--bg-hover-unchange);
		border: 1px solid var(--color-accent);
		padding: 22px 16px 10px 16px;
	}

	&:not(:focus) {
		padding: 22px 16px 10px 16px;
	}

	&::placeholder {
		visibility: hidden;
	}

	&:focus + .input-placeholder,
	&:not(:placeholder-shown) + .input-placeholder {
		top: 3px;
		left: 16px;
		font-weight: 400;
		font-size: 12px;
		line-height: 16.8px;
		color: var(--color-grey-light);
	}

	&.input-error {
		border: 1px solid var(--color-red);
	}
`;

export const InputPlaceholder = styled.span`
	position: absolute;
	left: 16px;
	top: 16px;
	transition: 0.3s ease;
	pointer-events: none;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-light-change);
`;

export const InputError = styled.p`
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-red);
	display: flex;
	align-items: center;
	gap: 6px;

	span {
		line-height: 10px;
	}
`;

export const InputDropHeader = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background-color: var(--bg-auth-input);
	border: 1px solid var(--bg-auth-input);
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-light-change);

	&:hover {
		background-color: var(--bg-hover-unchange);
	}

	&:focus {
		background-color: var(--bg-hover-unchange);
		border: 1px solid var(--color-accent);
		padding: 22px 16px 10px 16px;
	}

	&.is-focused {
		padding: 22px 16px 10px 16px;
	}

	& .input-dropdown-placeholder {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 16px;
		line-height: 22.4px;
		color: var(--color-black-change);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
		color: var(--color-black-light-change);
	}

	& .input-dropdown-text {
		transition: font-size 0.3s ease-in-out;
		color: var(--color-black-light-change);
	}

	&.is-focused .input-dropdown-placeholder,
	&:focus-within .input-dropdown-placeholder {
		top: 10px;
		left: 16px;
		font-weight: 400;
		font-size: 12px;
		line-height: 16.8px;
		color: var(--color-grey-light);
	}

	&.is-focused .input-dropdown-text {
		font-size: 16px;
	}

	&.input-error {
		border: 1px solid var(--color-red);
	}
`;

export const InputDropArrow = styled.span`
	width: 24px;
	height: 24px;
	color: var(--color-black-change);
	position: absolute;
	top: 15px;
	right: 18px;
`;

export const InputContainerPass = styled.div`
	position: relative;
	width: 100%;
	height: 54px;
	margin-bottom: 23px;
`;

export const InputPassEye = styled.span`
	width: 24px;
	height: 24px;
	color: var(--color-black-change);
	position: absolute;
	top: 18px;
	right: 18px;
	cursor: pointer;
`;

export const InputShowText = styled.p`
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-grey-light);
	position: absolute;
	bottom: -24px;
	right: 0px;
`;

export const InputErrorFix = styled.p`
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-red);
	display: flex;
	align-items: center;
	gap: 6px;
	position: absolute;
	bottom: 0px;
	left: 0px;

	span {
		line-height: 10px;
	}
`;

export const InputUpload = styled.div`
	width: 100%;
	height: 186px;

	input {
		display: none;
	}
`;

export const InputPreview = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	&:hover .input-change-box {
		bottom: 0px;
	}
`;

export const InputChangeBox = styled.div`
	position: absolute;
	bottom: -40px;
	left: 0;
	width: 100%;
	height: 40px;
	background-color: #eff2f9b7;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: bottom 0.5s ease;

	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
		text-decoration: underline;
		color: var(--color-accent);
		cursor: pointer;
	}
`;

export const InputUploadScreen = styled.label`
	width: 100%;
	height: 100%;
	position: relative;
	display: block;
	background-color: var(--bg-auth-input);
	border-radius: 10px;
`;

export const InputScreen = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	cursor: pointer;

	span {
		width: 24px;
		height: 24px;
		color: var(--color-accent);
	}

	p {
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
		text-decoration: underline;
		color: var(--color-accent);
	}
`;

export const InputRemember = styled.input`
	display: none;

	&:checked + .input-custom-checkbox .input-checkbox-icon {
		opacity: 1;
	}

	&:checked + .input-custom-checkbox::before {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
	}
`;

export const InputRememberCheckbox = styled.label`
	position: relative;
	padding-left: 34px;
	cursor: pointer;
	user-select: none;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);

	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 24px;
		height: 24px;
		background-color: var(--bg-white);
		border: 2px solid var(--color-accent);
		border-radius: 4px;
		transition: background-color 0.3s;
	}
`;

export const InputRememberIcon = styled.div`
	position: absolute;
	left: 4px;
	top: 50%;
	transform: translateY(-50%);
	width: 16px;
	height: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s;
`;

export const InputSocialWrap = styled.label`
	position: relative;
	width: 100%;
	height: 30px;
	display: flex;
	align-items: center;

	p {
		font-weight: 400;
		font-size: 12px;
		line-height: 16.8px;
		color: var(--color-grey-light);
		min-width: 60px;
	}

	img {
		margin-right: 10px;
	}

	@media (max-width: 767px) {
		p {
			display: none;
		}
	}
`;

export const InputSocialField = styled.input`
	position: relative;
	width: 100%;
	height: 100%;
	padding: 0 8px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-black-change);
	background-color: var(--bg-auth-input);
	border: 1px solid var(--bg-auth-input);
	border-radius: 10px;

	&:focus {
		background-color: var(--bg-hover-unchange);
		border: 1px solid var(--color-accent);
	}

	&::placeholder {
		position: absolute;
		right: 8px;
		font-weight: 400;
		font-size: 12px;
		line-height: 16.8px;
		color: var(--color-grey-light);
	}
`;

export const InputSocialError = styled.span`
	position: absolute;
	right: 8px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-red);
`;
