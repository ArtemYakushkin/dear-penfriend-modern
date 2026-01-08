import styled from 'styled-components';

export const Wrap = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	border-bottom: 1px solid var(--color-grey-light);
	margin-bottom: 30px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 0px;
		margin-bottom: 40px;
	}

	@media (max-width: 767px) {
		gap: 4px;
	}
`;

export const Btn = styled.button`
	padding: 20px 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	color: var(--color-grey-light);
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	transition: color 0.3s;

	&.active {
		color: var(--color-black-change);
		position: relative;
	}

	&.active::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 3px;
		background-color: var(--color-accent);
		bottom: -1px;
		left: 0;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 18px 10px;
		gap: 6px;
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		padding: 14px 10px;
		gap: 6px;
		font-size: 16px;
		line-height: 16px;

		&.active::after {
			bottom: -2px;
		}
	}
`;
