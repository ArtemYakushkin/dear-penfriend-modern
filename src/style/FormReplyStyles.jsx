import styled from 'styled-components';

export const Form = styled.form`
	position: relative;
	width: 100%;
	background-color: var(--bg-auth-input);
	border-radius: 20px;
`;

export const Textarea = styled.textarea`
	width: 100%;
	height: 70px;
	padding: 18px 30px;
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	background-color: transparent;
	resize: none;

	&::placeholder {
		font-weight: 400;
		font-size: 18px;
		line-height: 28.8px;
		color: var(--color-black-change);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 60px;
		font-size: 16px;
		line-height: 25.6px;
		padding: 12px 21px;

		&::placeholder {
			font-size: 16px;
			line-height: 25.6px;
		}
	}

	@media (max-width: 767px) {
		height: 60px;
		font-size: 16px;
		line-height: 25.6px;
		padding: 12px 15px;

		&::placeholder {
			font-size: 16px;
			line-height: 25.6px;
		}
	}
`;

export const Error = styled.p`
	position: absolute;
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-red);
	bottom: 13px;
	right: 70px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 12px;
		bottom: 10px;
		right: 60px;
	}

	@media (max-width: 767px) {
		font-size: 12px;
		top: 43px;
		left: 15px;
	}
`;

export const Options = styled.div`
	width: 100%;
	height: 44px;
	padding: 0 17px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	background-color: var(--bg-form-comment-options);
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 36px;
	}

	@media (max-width: 767px) {
		height: 38px;
		padding: 0 10px;
	}
`;

export const Wrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 14px;
`;
