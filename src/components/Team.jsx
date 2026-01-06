import styled from 'styled-components';

import TeamAnna from './TeamAnna';
import TeamArtem from './TeamArtem';
import TeamNastya from './TeamNastya';
import { Container } from '../style/Container';

const Section = styled.div`
	padding: 120px 0;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 90px 0;
	}

	@media (max-width: 767px) {
		padding: 90px 0;
	}
`;

const Wrap = styled.div`
	display: flex;
	gap: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		flex-direction: column;
		gap: 40px;
	}

	@media (max-width: 767px) {
		flex-direction: column;
		gap: 30px;
	}
`;

const Left = styled.div`
	margin-top: 69px;
	max-width: 280px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 0px;
		max-width: 100%;
	}

	@media (max-width: 767px) {
		margin-top: 0px;
		max-width: 100%;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
	margin-bottom: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 40px;
		line-height: 46px;
		margin-bottom: 16px;
	}

	@media (max-width: 767px) {
		font-size: 40px;
		line-height: 46px;
		margin-bottom: 24px;
	}
`;

const Text = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 25.6px;
	}

	@media (max-width: 767px) {
		font-size: 18px;
		line-height: 28.8px;
	}
`;

const Right = styled.div`
	display: flex;
	gap: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 22px;
	}

	@media (max-width: 767px) {
		flex-direction: column;
		gap: 30px;
	}
`;

const Team = () => {
	return (
		<Section>
			<Container>
				<Wrap>
					<Left>
						<Title>Our team</Title>
						<Text>
							Meet the people who made this platform with love,
							ideas — and many cups of coffee
						</Text>
					</Left>

					<Right>
						<TeamAnna />
						<TeamArtem />
						<TeamNastya />
					</Right>
				</Wrap>
			</Container>
		</Section>
	);
};

export default Team;
