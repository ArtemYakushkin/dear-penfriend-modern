import styled from 'styled-components';

export const List = styled.ul`
	position: absolute;
	top: 64px;
	left: 0px;
	z-index: 99;
	width: 100%;
	padding: 10px 0;
	background-color: var(--bg-drop-list);
	border-radius: 10px;
	box-shadow: 0px 0px 2px 0px #01010129;
`;

export const Item = styled.li`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-change);
	padding-left: 16px;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: var(--bg-hover-unchange);
	}

	@media (max-width: 767px) {
		padding-left: 14px;
		padding-top: 6px;
		padding-bottom: 6px;
	}
`;
