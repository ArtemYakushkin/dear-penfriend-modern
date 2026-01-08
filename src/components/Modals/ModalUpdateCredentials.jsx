import { useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '../../firebase';
import { useResponsive } from '../../hooks/useResponsive';
import ButtonCloseModal from '../Buttons/ButtonCloseModal';
import InputPassword from '../Inputs/InputPassword';
import ButtonLg from '../Buttons/ButtonLg';

import { ModalOverlay, Modal } from '../../style/ModalStyles';

const Title = styled.h2`
	font-weight: 700;
	font-size: 28px;
	line-height: 33.6px;
	color: var(--color-black-change);
	text-align: center;
`;

const Content = styled.div`
	width: 432px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	@media (max-width: 767px) {
		width: 100%;
	}
`;

const BtnBox = styled.div`
	width: 432px;
	display: flex;
	justify-content: space-between;

	@media (max-width: 767px) {
		width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
`;

const ModalUpdateCredentials = ({ onClose }) => {
	const user = auth.currentUser;
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const { isMobile } = useResponsive();

	const handleUpdatePassword = async () => {
		let newErrors = {};

		if (!user || !user.email) {
			newErrors.general = 'Error: User is not authenticated';
		}

		if (!oldPassword) {
			newErrors.oldPassword = 'Enter your current password';
		}

		if (!newPassword) {
			newErrors.newPassword = 'Please enter a new password';
		} else if (newPassword.length < 6) {
			newErrors.newPassword = 'Password must be at least 6 characters';
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = 'Confirm the new password';
		} else if (newPassword !== confirmPassword) {
			newErrors.confirmPassword = 'The passwords do not match';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});

		try {
			const credential = EmailAuthProvider.credential(user.email, oldPassword);
			await reauthenticateWithCredential(user, credential);

			await updatePassword(user, newPassword);
			toast.success('Password updated successfully!');
			setTimeout(() => onClose(), 2000);
		} catch (error) {
			console.error('Update error:', error);

			let errorMessage = {};
			if (error.code === 'auth/invalid-credential') {
				errorMessage.oldPassword = 'Incorrect old password';
			} else if (error.code === 'auth/weak-password') {
				errorMessage.newPassword = 'The password is too weak';
			} else {
				errorMessage.general = error.message;
			}

			setErrors(errorMessage);
		}
	};

	return (
		<ModalOverlay>
			<Modal
				style={{
					width: isMobile ? '100%' : '',
					padding: isMobile ? '20px 10px' : '40px',
					display: 'flex',
					flexDirection: 'column',
					gap: isMobile ? '20px' : '40px',
				}}
			>
				<ButtonCloseModal onClose={onClose} />

				<Title>Settings</Title>

				<Content>
					<InputPassword
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						showPassword={showOldPassword}
						togglePasswordVisibility={() => setShowOldPassword(!showOldPassword)}
						errorMessage={errors.oldPassword}
						placeholder={'Old password (min. 6 characters)'}
					/>

					<InputPassword
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						showPassword={showNewPassword}
						togglePasswordVisibility={() => setShowNewPassword(!showNewPassword)}
						errorMessage={errors.newPassword}
						placeholder={'New password'}
					/>

					<InputPassword
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						showPassword={showConfirmPassword}
						togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
						errorMessage={errors.confirmPassword}
						placeholder={'Confirm new password'}
					/>
				</Content>

				<BtnBox>
					<ButtonLg
						onClick={onClose}
						text={'Cancel changes'}
						style={{
							color: 'var(--color-accent)',
							border: '1px solid var(--color-accent)',
							width: isMobile ? '100%' : '',
						}}
					/>

					<ButtonLg
						onClick={handleUpdatePassword}
						text={'Save changes'}
						style={{
							color: 'var(--color-white)',
							border: '1px solid var(--color-accent)',
							backgroundColor: 'var(--color-accent)',
							width: isMobile ? '100%' : '',
						}}
					/>
				</BtnBox>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalUpdateCredentials;
