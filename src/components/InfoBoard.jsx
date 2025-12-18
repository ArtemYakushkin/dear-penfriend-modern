import styled from 'styled-components';

import { Container } from '../style/Container';

import { RiInformationLine } from 'react-icons/ri';

const BoardBox = styled.div`
	width: 330px;
	padding: 20px 10px 20px 13px;
	background-color: var(--bg-info-board);
	border-radius: 10px;
	border-left: 7px solid var(--color-accent);
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--color-accent);
	box-shadow: var(--shadow-dropdown);
`;

const BoardMessage = styled.p`
	margin-top: 2px;
	font-weight: 400;
	font-size: 16px;
	line-height: 16px;
	color: var(--text-black);
`;

const InfoBoard = ({ message, style }) => {
	return (
		<Container>
			<BoardBox style={style}>
				<RiInformationLine size={24} />
				<BoardMessage>{message}</BoardMessage>
			</BoardBox>
		</Container>
	);
};

export default InfoBoard;
