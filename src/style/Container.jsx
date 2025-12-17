import styled from 'styled-components';

export const Container = styled.div`
	max-width: 1440px;
	padding: 0 120px;
	margin: 0 auto;

	@media (min-width: 768px) and (max-width: 1259px) {
		max-width: 768px;
		padding: 0 44px;
	}

	@media (max-width: 767px) {
		max-width: 375px;
		width: 100%;
		padding: 0 24px;
	}
`;
