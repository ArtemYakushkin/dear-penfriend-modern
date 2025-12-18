import styled, { css } from 'styled-components';

const Choice = styled.div`
	display: flex;
	align-items: center;
	margin-right: 35px;
	flex-shrink: 0;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-right: 40px;
	}

	@media (max-width: 767px) {
		display: none;
	}
`;

const ChoiceTitle = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-light);
	margin-right: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		display: none;
	}

	@media (max-width: 767px) {
		display: none;
	}
`;

const ChoiceSquare = styled.div`
	width: 24px;
	height: 24px;
	display: flex;
	flex-wrap: wrap;
	gap: 2px;
	margin-right: 10px;
	cursor: pointer;

	div {
		width: 11px;
		height: 11px;
		background-color: var(--bg-mode);
		border-radius: 2px;
	}

	/* transient prop $active (не попадёт в DOM) */
	${(p) =>
		p.$active &&
		css`
			div {
				background-color: var(--color-accent);
			}
		`}
`;

const SquareItem = styled.div``;

const ChoiceLine = styled.div`
	width: 24px;
	height: 24px;
	display: flex;
	flex-direction: column;
	gap: 3px;
	cursor: pointer;

	div {
		width: 24px;
		height: 6px;
		background-color: var(--bg-mode);
		border-radius: 2px;
	}

	${(p) =>
		p.$active &&
		css`
			div {
				background-color: var(--color-accent);
			}
		`}
`;

const LineItem = styled.div``;

const ViewToggle = ({ viewMode, setViewMode }) => {
	return (
		<Choice>
			<ChoiceTitle>Display modes:</ChoiceTitle>

			<ChoiceSquare
				$active={viewMode === 'grid'}
				onClick={() => setViewMode('grid')}
			>
				<SquareItem />
				<SquareItem />
				<SquareItem />
				<SquareItem />
			</ChoiceSquare>

			<ChoiceLine
				$active={viewMode === 'list'}
				onClick={() => setViewMode('list')}
			>
				<LineItem />
				<LineItem />
				<LineItem />
			</ChoiceLine>
		</Choice>
	);
};

export default ViewToggle;
