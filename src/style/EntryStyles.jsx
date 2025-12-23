import styled from 'styled-components';

export const Item = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;

	&::before {
		content: '';
		position: absolute;
		left: 24px;
		top: 55px;
		bottom: 15px;
		width: 2px;
		background-color: var(--bg-inactive-grey);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		&::before {
			left: 20px;
			top: 49px;
			bottom: 18px;
		}
	}

	@media (max-width: 767px) {
		&::before {
			content: '';
			position: absolute;
			left: 20px;
			top: 45px;
			bottom: 12px;
		}
	}
`;

export const TopSection = styled.div`
	display: flex;
	gap: 13px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 8px;
	}

	@media (max-width: 767px) {
		gap: 8px;
	}
`;

export const Content = styled.div`
	flex-grow: 1;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Info = styled.div`
	padding: 15px;
	background-color: var(--bg-auth-input);
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	gap: 7px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 13px;
	}

	@media (max-width: 767px) {
		padding: 13px;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const User = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: start;
		gap: 0px;
	}
`;

export const Media = styled.div`
	width: 326px;
	border-radius: 20px;
	overflow: hidden;
	cursor: pointer;

	img {
		width: 100%;
		height: auto;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 226px;
	}
	@media (max-width: 767px) {
		width: 200px;
	}
`;

export const Nickname = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 14px;
		line-height: 19.6px;
	}
	@media (max-width: 767px) {
		font-size: 14px;
		line-height: 19.6px;
	}
`;

export const Date = styled.p`
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

export const Text = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 14px;
		line-height: 16.8px;
	}
	@media (max-width: 767px) {
		font-size: 14px;
		line-height: 16.8px;
	}
`;

export const CenterSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 61px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-left: 48px;
	}
	@media (max-width: 767px) {
		margin-left: 48px;
	}
`;

export const Actions = styled.div`
	display: flex;
	gap: 20px;
`;

export const BtnAction = styled.button`
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-accent);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 14px;
		line-height: 16.8px;
	}
	@media (max-width: 767px) {
		font-size: 14px;
		line-height: 16.8px;
	}
`;

export const BtnLike = styled.button`
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

export const ReplyBox = styled.div`
	margin-left: 61px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-left: 48px;
	}
	@media (max-width: 767px) {
		margin-left: 48px;
	}
`;

export const BottomSection = styled.div`
	position: relative;
	margin-left: 61px;

	span {
		position: absolute;
		background-color: var(--bg-post-wrap);
		width: 12px;
		height: 12px;
		border-bottom-left-radius: 6px;
		top: 0px;
		left: -35px;
	}

	&::after {
		content: '';
		position: absolute;
		top: 12px;
		left: -30px;
		width: 23px;
		height: 2px;
		background-color: var(--bg-inactive-grey);
	}

	&::before {
		content: '';
		position: absolute;
		top: 2px;
		left: -37px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: transparent;
		border: 2px solid var(--bg-inactive-grey);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-left: 48px;

		span {
			left: -26px;
		}

		&::after {
			left: -23px;
			width: 14px;
		}

		&::before {
			left: -28px;
		}
	}
	@media (max-width: 767px) {
		margin-left: 48px;

		span {
			display: none;
		}

		&::after {
			top: 10px;
			left: -26px;
			width: 17px;
		}

		&::before {
			display: none;
		}
	}
`;

export const BtnMore = styled.button`
	display: flex;
	align-items: center;
	gap: 10px;

	div {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--color-more);
		color: var(--color-more);
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 1px;
	}

	p {
		font-weight: 400;
		font-size: 14px;
		color: var(--color-more);
	}
`;
