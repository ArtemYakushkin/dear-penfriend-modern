import styled from 'styled-components';

export const Item = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;

	span {
		position: absolute;
		background-color: var(--bg-post-wrap);
		width: 12px;
		height: 12px;
		border-bottom-left-radius: 6px;
		top: 8px;
		left: -35px;
	}

	&::after {
		content: '';
		position: absolute;
		top: 20px;
		left: -30px;
		width: 23px;
		height: 2px;
		background-color: var(--bg-inactive-grey);
	}

	&::before {
		content: '';
		position: absolute;
		top: 10px;
		left: -37px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: transparent;
		border: 2px solid var(--bg-inactive-grey);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;

		span {
			top: 4px;
			left: -26px;
		}

		&::after {
			top: 16px;
			left: -22px;
			width: 15px;
		}

		&::before {
			top: 6px;
			left: -28px;
		}
	}

	@media (max-width: 767px) {
		span {
			display: none;
		}

		&::after {
			top: 16px;
			left: -28px;
			width: 20px;
		}

		&::before {
			display: none;
		}
	}
`;

export const Top = styled.div`
	display: flex;
	gap: 8px;
`;

export const Content = styled.div`
	flex-grow: 1;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;

	@media (max-width: 767px) {
		gap: 0;
	}
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
		width: 150px;
	}
`;

export const Actions = styled.div`
	display: flex;
	gap: 20px;

	@media (max-width: 767px) {
		display: flex;
		gap: 20px;
	}
`;
