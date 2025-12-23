import styled from 'styled-components';

export const Form = styled.div`
	display: flex;
	justify-content: center;
	gap: 13px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 8px;
	}

	@media (max-width: 767px) {
		gap: 8px;
	}
`;

export const Wrap = styled.div`
	position: relative;
	width: 100%;
	background-color: var(--bg-auth-input);
	border-radius: 20px;
`;

export const Textarea = styled.textarea`
	width: 100%;
	height: 100px;
	padding: 18px 30px;
	background-color: transparent;
	resize: none;
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);

	&::placeholder {
		font-weight: 400;
		font-size: 18px;
		line-height: 28.8px;
		color: var(--color-black-change);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 63px;
		padding: 18px 21px;
		font-weight: 400;
		font-size: 16px;
		line-height: 25.6px;

		&::placeholder {
			font-size: 16px;
			line-height: 25.6px;
		}
	}

	@media (max-width: 767px) {
		height: 63px;
		padding: 18px 21px;
		font-size: 16px;
		line-height: 25.6px;

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
	bottom: 14px;
	right: 70px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 12px;
		bottom: 12px;
		right: 55px;
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
`;

export const BtnEmoji = styled.button`
	width: 24px;
	height: 24px;
	color: var(--color-grey-change);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const BtnSubmit = styled.button`
	width: 36px;
	height: 36px;
	color: var(--color-accent);
	display: flex;
	align-items: center;
	justify-content: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 24px;
		height: 24px;
	}

	@media (max-width: 767px) {
		width: 24px;
		height: 24px;
	}
`;

export const EmojiModal = styled.div`
	position: absolute;
	bottom: 40px;
	left: 0;
	z-index: 100;

	@media (max-width: 767px) {
		left: -60px;
	}
`;

export const BtnUnReg = styled.button`
	font-weight: 700;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-accent);
	text-decoration: underline;
	text-align: center;
`;
