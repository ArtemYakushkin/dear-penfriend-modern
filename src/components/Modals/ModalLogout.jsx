import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

import {
	ModalOverlay,
	Modal,
	ModalWrap,
	ModalTitle,
	ModalActions,
	ModalBtnYes,
	ModalBtnNo,
} from '../../style/ModalStyles';

const ModalLogout = ({ onClose }) => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	return (
		<ModalOverlay id="modal-overlay">
			<Modal className="modal-orange" style={{ width: '406px' }}>
				<ModalWrap>
					<ModalTitle>Are you sure you want to log out of your account?</ModalTitle>
					<ModalActions>
						<ModalBtnYes
							onClick={() => {
								logout();
								onClose();
								navigate('/');
							}}
						>
							Yes
						</ModalBtnYes>
						<ModalBtnNo onClick={onClose}>No</ModalBtnNo>
					</ModalActions>
				</ModalWrap>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalLogout;
