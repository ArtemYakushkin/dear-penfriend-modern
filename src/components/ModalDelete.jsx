import {
	ModalOverlay,
	Modal,
	ModalWrap,
	ModalTitle,
	ModalActions,
	ModalBtnYes,
	ModalBtnNo,
} from '../style/ModalStyles';

const ModalDelete = ({ onConfirm, onCancel }) => {
	return (
		<ModalOverlay>
			<Modal className="modal-orange" style={{ width: '406px' }}>
				<ModalWrap>
					<ModalTitle>
						Are you sure you want to delete this message?
					</ModalTitle>
					<ModalActions>
						<ModalBtnYes onClick={onConfirm}>Yes</ModalBtnYes>
						<ModalBtnNo onClick={onCancel}>No</ModalBtnNo>
					</ModalActions>
				</ModalWrap>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalDelete;
