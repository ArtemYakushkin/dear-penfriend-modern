import styled from 'styled-components';

export const Grid = styled.div`
	width: 100%;
	height: 645px;
	padding: 20px 0 20px 0;
	border-radius: 30px;
	background-color: var(--bg-white);
	box-shadow: var(--register-shadow);
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 100%;
		height: 540px;
		padding: 20px 0 20px 0;
	}

	@media (max-width: 767px) {
		width: 100%;
		height: 540px;
		padding: 20px 0 20px 0;
	}
`;

export const GridHeader = styled.div`
	padding: 0 20px 0 20px;
	margin-bottom: 22px;
	display: flex;
	align-items: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 21px;
	}

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

export const GridNickname = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
	}
`;

export const GridDate = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-light);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 12px;
		line-height: 14.4px;
	}

	@media (max-width: 767px) {
		font-size: 12px;
		line-height: 14.4px;
	}
`;

export const GridContent = styled.div`
	cursor: pointer;
`;

export const GridImage = styled.div`
	width: 100%;
	height: 216px;
	margin-bottom: 22px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 184px;
		margin-bottom: 20px;
	}

	@media (max-width: 767px) {
		height: 184px;
		margin-bottom: 20px;
	}
`;

export const GridBoxText = styled.div`
	padding: 0 20px 0 20px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 0;
	}

	@media (max-width: 767px) {
		margin-bottom: 0;
	}
`;

export const GridTitle = styled.p`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	margin-bottom: 10px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

export const GridText = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	max-width: 100%;
	cursor: pointer;
	margin-bottom: 4px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
		margin-bottom: 2px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 25.6px;
		margin-bottom: 2px;
	}
`;

export const GridMore = styled.div`
	width: 100%;
	display: flex;
	justify-content: end;

	span {
		position: relative;
		font-weight: 400;
		font-size: 18px;
		line-height: 28.8px;
		color: var(--color-accent);
		cursor: pointer;

		&::after {
			content: '';
			position: absolute;
			bottom: 4px;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: var(--color-accent);
		}
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		span {
			font-size: 16px;
			line-height: 25.6px;
		}
	}

	@media (max-width: 767px) {
		span {
			font-size: 16px;
			line-height: 25.6px;
		}
	}
`;

export const GridBottom = styled.div`
	margin-top: auto;
`;

export const GridLine = styled.div`
	padding: 0 20px 0 20px;
	margin-bottom: 30px;

	div {
		width: 100%;
		height: 1px;
		background-color: var(--color-grey-light);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 22px;
	}

	@media (max-width: 767px) {
		margin-bottom: 22px;
	}
`;

export const GridFooter = styled.div`
	padding: 0 20px 0 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const GridIconBox = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const GridIcon = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 8px;
	border-radius: 5px;
	background-color: var(--bg-auth-input);

	span {
		font-weight: 400;
		font-size: 14px;
		line-height: 16.59px;
		color: var(--color-black-change);
	}
`;

export const GridSaved = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-black-change);
`;

export const GridBtnDel = styled.button`
	// position: absolute;
	// bottom: -25px;
	// right: 30px;
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-accent);
	margin-top: 20px;
`;
