import { useState, useEffect, useCallback } from 'react';

export const useModalControls = (
	isUnregisterOpen = false,
	onCloseUnregister = () => {},
) => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

	useEffect(() => {
		if (isUnregisterOpen || isRegisterModalOpen || isLoginModalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isUnregisterOpen, isRegisterModalOpen, isLoginModalOpen]);

	const closeAll = useCallback(() => {
		setIsLoginModalOpen(false);
		setIsRegisterModalOpen(false);
		onCloseUnregister();
	}, [onCloseUnregister]);

	const openRegister = useCallback(() => {
		setIsRegisterModalOpen(true);
		setIsLoginModalOpen(false);
	}, []);

	const openLogin = useCallback(() => {
		setIsLoginModalOpen(true);
		setIsRegisterModalOpen(false);
	}, []);

	return {
		isLoginModalOpen,
		isRegisterModalOpen,
		openRegister,
		openLogin,
		closeAll,
		setIsLoginModalOpen,
		setIsRegisterModalOpen,
	};
};
