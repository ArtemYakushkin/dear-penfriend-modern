import styled from 'styled-components';

export const Table = styled.table`
	width: 100%;
	border-spacing: 0 10px;
	table-layout: fixed;
`;

export const Tr = styled.tr`
	height: 40px;
	background-color: var(--bg-post-wrap);
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
`;

export const Td = styled.td`
	padding: 14px;
	font-size: 14px;
	color: var(--color-black-change);
	text-align: center;

	&:first-child {
		border-radius: 10px 0 0 10px;
	}

	&:last-child {
		border-radius: 0 10px 10px 0;
	}
`;

export const Image = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
`;

export const Options = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 24px;
	margin-bottom: 24px;
`;

export const Count = styled.h3`
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);

	span {
		font-weight: 700;
	}
`;

export const Pagination = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;

	span {
		font-weight: 700;
		font-size: 20px;
		line-height: 24px;
		color: var(--color-black-change);
	}
`;

export const Button = styled.button`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #2f7bf659;
	cursor: pointer;
`;
