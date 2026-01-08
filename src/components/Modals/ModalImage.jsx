import styled from 'styled-components';

import ButtonCloseModal from '../Buttons/ButtonCloseModal';
import { useResponsive } from '../../hooks/useResponsive';
import { ModalOverlay, Modal } from '../../style/ModalStyles';

const Image = styled.img`
	width: 100%;
	max-width: 80vw;
	max-height: 80vh;
	object-fit: contain;
	border-radius: 5px;
`;

const ModalImage = ({ imageUrl, onClose }) => {
	const { isMobile } = useResponsive();

	return (
		<ModalOverlay>
			<Modal style={{ padding: '26px 20px 20px 20px', width: isMobile ? '100%' : '' }}>
				<ButtonCloseModal onClose={onClose} />

				<Image src={imageUrl} alt="Big" />
			</Modal>
		</ModalOverlay>
	);
};

export default ModalImage;
