import styled from 'styled-components';

export const Select = styled.div`
	width: 175px;
	flex-shrink: 0;

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 180px;
	}

	@media (max-width: 767px) {
		width: 100px;
	}
`;

export const SelectHeader = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

export const SelectTitle = styled.span`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-light);
	margin-right: 17px;

	@media (max-width: 767px) {
		display: none;
	}
`;

export const SelectText = styled.span`
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: var(--color-black-change);
	margin-right: 4px;
	cursor: pointer;
`;

export const SelectArrow = styled.span`
	width: 24px;
	height: 24px;
	color: var(--color-black-change);
	cursor: pointer;
`;

export const SelectList = styled.ul`
	position: absolute;
	top: 70px;
	left: 54px;
	width: 154px;
	background-color: var(--bg-drop-list);
	box-shadow: 0px 0px 2px 0px #01010129;
	padding: 10px 0px;
	border-radius: 10px;
	z-index: 10;

	@media (min-width: 768px) and (max-width: 1259px) {
		top: 60px;
		left: 95px;
		width: 100px;
		padding: 5px 0px;
	}

	@media (max-width: 767px) {
		top: 60px;
		left: 30px;
		width: 100px;
		padding: 5px 0px;
	}
`;

export const SelectItem = styled.li`
	width: 100%;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);
	cursor: pointer;
	padding-left: 14px;

	&:hover {
		background-color: var(--bg-hover-unchange);
	}

	@media (max-width: 767px) {
		padding: 14px 7px 0px 7px;
	}
`;
