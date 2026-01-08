import styled from 'styled-components';

export const Wrap = styled.div`
	padding: 40px 30px;
	background-color: var(--bg-white);
	border-radius: 30px;
	box-shadow: 0px 4px 16px 0px #2f7bf626;

	@media (max-width: 767px) {
		padding: 40px 20px;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

export const Title = styled.h2`
	font-weight: 700;
	font-size: 28px;
	line-height: 33.6px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

export const BtnEdit = styled.button`
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-decoration: underline;
	color: var(--color-accent);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

export const Text = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
`;

export const EditContainer = styled.div`
	position: relative;
	margin-top: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 0px;
	}
`;

export const QuillBox = styled.div`
	margin-bottom: 30px;

	.ql-toolbar.ql-snow {
		border-top-left-radius: 10px !important;
		border-top-right-radius: 10px !important;
		background-color: var(--bg-info-board) !important;
	}

	.ql-container.ql-snow {
		height: 145px !important;
		border-bottom-left-radius: 10px !important;
		border-bottom-right-radius: 10px !important;
		color: var(--color-black-change) !important;
	}

	.ql-header.ql-picker {
		display: none;
	}

	.ql-formats.ql-clean {
		display: none;
	}
`;

export const Error = styled.span`
	position: absolute;
	bottom: 63px;
	left: 0px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-red);

	@media (max-width: 767px) {
		bottom: 47px;
	}
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 12px;

	@media (max-width: 767px) {
		justify-content: center;
	}
`;
