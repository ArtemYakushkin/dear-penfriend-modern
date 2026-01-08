import { useState } from 'react';

import { isEnglishOnly } from '../../utils/validation';
import InputText from '../Inputs/InputText';

import { ModalOverlay, Modal, ModalWrap, ModalActions, ModalBtnYes, ModalBtnNo } from '../../style/ModalStyles';

const ModalEdit = ({ text, onTextChange, onSave, onCancel }) => {
	const [error, setError] = useState('');

	const handleSave = () => {
		if (!text.trim()) {
			setError('Comment cannot be empty.');
			return;
		}

		if (!isEnglishOnly(text)) {
			setError('Only English characters are allowed.');
			return;
		}

		onSave();
	};

	return (
		<ModalOverlay id="modal-overlay">
			<Modal className="modal-orange" style={{ width: '406px' }}>
				<ModalWrap>
					<InputText
						value={text}
						onChange={(e) => {
							onTextChange(e.target.value);
							setError('');
						}}
						errorMessage={error}
						placeholder={'Edit comment'}
					/>
					<ModalActions>
						<ModalBtnYes onClick={handleSave}>Save</ModalBtnYes>
						<ModalBtnNo onClick={onCancel}>Cancel</ModalBtnNo>
					</ModalActions>
				</ModalWrap>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalEdit;
