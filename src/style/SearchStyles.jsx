import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

export const Search = styled.div`
	position: relative;
	width: 100%;
	height: 52px;
	margin-left: 74px;
	margin-right: 74px;

	@media (min-width: 768px) and (max-width: 1259px) {
		height: 32px;
		margin-left: 40px;
		margin-right: 40px;
	}

	@media (max-width: 767px) {
		height: 32px;
		margin-right: 25px;
		margin-left: 25px;
	}
`;

export const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);
	border: 1px solid var(--bg-inactive-grey);
	border-radius: 30px;
	background-color: transparent;
	padding: 0px 64px 0px 25px;

	&::placeholder {
		font-weight: 400;
		font-size: 16px;
		line-height: 22.4px;
		color: var(--color-grey-light);
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		width: 100%;
		border: none;
		border-bottom: 1px solid var(--accent-blue-color);
		border-radius: 0px;
		background-color: transparent;
		padding: 0px;
	}

	@media (max-width: 767px) {
		width: 100%;
		border: none;
		border-bottom: 1px solid var(--accent-blue-color);
		border-radius: 0px;
		background-color: transparent;
		padding: 0px 0px 0px 5px;
	}
`;

export const SearchIcon = styled(FiSearch)`
	position: absolute;
	top: 50%;
	right: 25px;
	color: var(--color-accent);
	transform: translateY(-50%);

	@media (min-width: 768px) and (max-width: 1259px) {
		right: 8px;
	}

	@media (max-width: 767px) {
		right: 5px;
	}
`;
