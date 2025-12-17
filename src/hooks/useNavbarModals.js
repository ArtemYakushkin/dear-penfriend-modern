import { useState } from 'react';

export const useNavbarModals = () => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const openRegister = () => {
		setIsRegisterModalOpen(true);
		setIsLoginModalOpen(false);
	};

	const openLogin = () => {
		setIsLoginModalOpen(true);
		setIsRegisterModalOpen(false);
	};

	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return {
		isLoginModalOpen,
		isRegisterModalOpen,
		isMobileMenuOpen,
		isLogoutModalOpen,
		setIsLoginModalOpen,
		setIsRegisterModalOpen,
		setIsLogoutModalOpen,
		toggleMobileMenu,
		closeMobileMenu,
		openLogin,
		openRegister,
	};
};
