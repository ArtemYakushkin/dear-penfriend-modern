import Register from './Register';
import Login from './Login';
import ButtonCloseModal from './ButtonCloseModal';
import ButtonLg from './ButtonLg';

import { useModalControls } from '../hooks/useModalControls';

import {
	ModalOverlay,
	Modal,
	ModalInner,
	ModalImage,
	ModalContent,
	ModalSubtitle,
	ModalSubtext,
	ModalActions,
} from '../style/ModalStyles';

const ModalUnregister = ({ isOpen, onClose }) => {
	const {
		isLoginModalOpen,
		isRegisterModalOpen,
		openRegister,
		openLogin,
		closeAll,
		setIsLoginModalOpen,
		setIsRegisterModalOpen,
	} = useModalControls(isOpen, onClose);

	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<Modal
				onClick={(e) => e.stopPropagation()}
				style={{ padding: '0px' }}
			>
				<ButtonCloseModal onClose={closeAll} />

				<ModalInner>
					<ModalImage>
						<img src="/robby-hello.svg" alt="robot" />
					</ModalImage>
					<ModalContent>
						<ModalSubtitle>Please note</ModalSubtitle>
						<ModalSubtext>
							Please register or log in to the site to leave
							comments / likes / participate in interactives
						</ModalSubtext>
					</ModalContent>
					<ModalActions>
						<ButtonLg
							onClick={() => setIsLoginModalOpen(true)}
							text={'Sign in'}
							style={{
								color: 'var(--color-white)',
								backgroundColor: 'var(--color-accent)',
								border: '1px solid var(--color-accent)',
							}}
						/>
						<ButtonLg
							onClick={() => setIsRegisterModalOpen(true)}
							text={'Register'}
							style={{
								color: 'var(--color-accent-change)',
								border: '1px solid var(--color-accent-change)',
							}}
						/>
					</ModalActions>
				</ModalInner>
			</Modal>

			{isRegisterModalOpen && (
				<Register
					isVisible={isRegisterModalOpen}
					onClose={() => setIsRegisterModalOpen(false)}
					openLogin={openLogin}
					onCloseUnreg={closeAll}
				/>
			)}

			{isLoginModalOpen && (
				<Login
					isVisible={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
					openRegister={openRegister}
					onCloseUnreg={closeAll}
				/>
			)}
		</ModalOverlay>
	);
};

export default ModalUnregister;
