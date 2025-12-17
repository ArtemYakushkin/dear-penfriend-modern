import styled from 'styled-components';

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--bg-modal-overlay);
	backdrop-filter: blur(10px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	padding: 20px;

	@media (max-width: 767px) {
		padding: 20px 24px;
	}
`;

export const Modal = styled.div`
	padding: 26px 20px 30px 20px;
	position: relative;
	background-color: var(--bg-modal);
	border-radius: 10px;
	box-shadow: var(--shadow-modal);

	&.modal-orange {
		border-top: 14px solid var(--color-orange);
	}

	@media (max-width: 767px) {
		max-width: 327px;
		max-height: 100%;
		padding: 16px 10px 10px 10px;
		width: 307px;

		&.modal-orange {
			border-top: 10px solid var(--color-orange);
		}
	}
`;

export const ModalWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: 28px;

	@media (max-width: 767px) {
		gap: 18px;
	}
`;

export const ModalTitle = styled.h2`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	text-align: center;

	@media (max-width: 767px) {
		font-size: 14px;
		line-height: 22.8px;
	}
`;

export const ModalActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 14px;

	@media (max-width: 767px) {
		gap: 10px;
	}
`;

export const ModalBtnYes = styled.button`
	padding: 14px 36px;
	border-radius: 30px;
	border: 1px solid var(--color-accent);
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	background-color: var(--color-accent);
	color: var(--color-white);

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

export const ModalBtnNo = styled.button`
	padding: 14px 36px;
	border-radius: 30px;
	border: 1px solid var(--color-accent);
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-accent);

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

// ----------- MODAL WITH ROBOT -----------------

export const ModalInner = styled.div`
	padding: 20px;

	@media (max-width: 767px) {
		padding: 10px;
	}
`;

export const ModalImage = styled.div`
	position: relative;
	width: 100%;
	height: 185px;

	img {
		position: absolute;
		top: 50px;
		left: 50%;
		transform: translateX(-50%) scale(1.5);
	}

	@media (max-width: 767px) {
		height: 145px;

		img {
			top: 5px;
			transform: translateX(-50%) scale(1);
		}
	}
`;

export const ModalContent = styled.div`
	position: relative;
	max-width: 406px;
	padding: 26px 20px 20px 20px;
	border-radius: 10px;
	box-shadow: 0px 4px 8px 0px #00000026;
	border-top: 14px solid var(--color-accent);
	background-color: var(--bg-modal-box-content);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14px;
	margin-bottom: 20px;

	@media (max-width: 767px) {
		max-width: 307px;
		padding: 16px 10px 10px 10px;
		border-top: 10px solid var(--color-accent);
		gap: 10px;
	}
`;

export const ModalSubtitle = styled.h4`
	font-weight: 700;
	font-size: 24px;
	line-height: 31.2px;
	color: var(--color-accent);
	text-align: center;

	@media (max-width: 767px) {
		font-size: 20px;
		line-height: 10.2px;
	}
`;

export const ModalSubtext = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	text-align: center;

	@media (max-width: 767px) {
		font-size: 14px;
		line-height: 22.8px;
	}
`;
