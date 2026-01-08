import { useEffect } from 'react';

import ButtonCloseModal from '../Buttons/ButtonCloseModal';
import { ModalOverlay, Modal } from '../../style/ModalStyles';

const QuizModal = ({ isOpen, onClose, message }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<Modal>
				<div>{message}</div>
				<ButtonCloseModal onClose={onClose} />
			</Modal>
		</ModalOverlay>
	);
};

export default QuizModal;
