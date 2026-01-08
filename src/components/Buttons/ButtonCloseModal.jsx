import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';

const Button = styled.button`
	position: absolute;
	top: -10px;
	right: -10px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: var(--bg-modal-btn);
	box-shadow: var(--bg-modal-btn-shadow);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ButtonCloseModal = ({ onClose }) => {
	return (
		<Button className="btn-close" onClick={onClose}>
			<IoIosClose size={30} color="var(--color-grey-change)" />
		</Button>
	);
};

export default ButtonCloseModal;
