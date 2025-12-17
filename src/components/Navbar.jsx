import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { useAuthStore } from '../store/useAuthStore';
import { useResponsive } from '../hooks/useResponsive';
import { useNavbarModals } from '../hooks/useNavbarModals';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useDropdown } from '../hooks/useDropdown';
import { ThemeContext } from '../context/ThemeContext';

import LogoBrand from './LogoBrand';
import MenuNav from './MenuNav';
import ButtonLg from './ButtonLg';
import ButtonBurger from './ButtonBurger';
import Register from './Register';
import Login from './Login';
import ButtonNotify from './ButtonNotify';
import Avatar from './Avatar';
import DropdownNavbar from './DropdownNavbar';
import ModalLogout from './ModalLogout';
import MobileMenu from './MobileMenu';

import { Container } from '../style/Container';

const Section = styled.div`
	padding: 20px 0 20px 0;

	@media (max-width: 767px) {
		padding: 16px 0 16px 0;
		border-bottom: 1px solid #bcd8ff03;
		box-shadow: 0px 1px 3px 0px #2f7bf680;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: var(--background);
		background-color: var(--bg-white);
		z-index: 20;
	}
`;

const Wrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Nav = styled.div`
	display: flex;
	align-items: center;
	gap: 56px;
`;

const Options = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 767px) {
		gap: 17px;
	}
`;

const Auth = styled.div`
	display: flex;
	align-items: center;
	gap: 13px;

	@media (max-width: 767px) {
		gap: 17px;
	}
`;

const NavbarOverlay = styled.div`
	position: fixed;
	top: 82px;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--bg-navbar-overlay);
	opacity: 0.7;
	backdrop-filter: blur(5px);
	z-index: 25;
	transition: opacity 5s ease-in-out;
`;

const Navbar = () => {
	const { user } = useAuthStore();
	const { theme, toggleTheme } = useContext(ThemeContext);
	const isDarkTheme = theme === 'dark';
	const navigate = useNavigate();
	const { isMobile } = useResponsive();

	const {
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
	} = useNavbarModals();

	useBodyScrollLock(
		isLoginModalOpen || isRegisterModalOpen || isMobileMenuOpen,
	);

	const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

	return (
		<Section>
			<Container>
				<Wrap>
					<Nav>
						<LogoBrand />
						<MenuNav />
					</Nav>

					{user ? (
						<Options>
							<ButtonNotify />

							<Avatar
								photo={user?.photoURL}
								name={user?.displayName}
								onClick={() => navigate('/profile')}
								style={{
									width: isMobile ? '40px' : '52px',
									height: isMobile ? '40px' : '52px',
									marginRight: isMobile ? '0px' : '5px',
								}}
							/>

							<DropdownNavbar
								toggleDropdown={toggleDropdown}
								dropdownRef={dropdownRef}
								isOpen={isOpen}
								setIsLogoutModalOpen={setIsLogoutModalOpen}
							/>

							<ButtonBurger
								isMobileMenuOpen={isMobileMenuOpen}
								toggleMobileMenu={toggleMobileMenu}
							/>
						</Options>
					) : (
						<Auth>
							<ButtonLg
								onClick={() => setIsRegisterModalOpen(true)}
								text={'Register'}
								style={{
									color: 'var(--color-accent-change)',
									border: '1px solid var(--color-accent-change)',
									display: isMobile ? 'none' : '',
								}}
							/>
							<ButtonLg
								onClick={() => {
									setIsLoginModalOpen(true);
									closeMobileMenu();
								}}
								text={'Sign in'}
								style={{
									color: 'var(--color-white)',
									backgroundColor: 'var(--color-accent)',
									border: '1px solid var(--color-accent)',
								}}
							/>
							<ButtonBurger
								isMobileMenuOpen={isMobileMenuOpen}
								toggleMobileMenu={toggleMobileMenu}
							/>
						</Auth>
					)}
				</Wrap>
			</Container>

			<MobileMenu
				isOpen={isMobileMenuOpen}
				toggleMenu={toggleMobileMenu}
				closeMenu={closeMobileMenu}
				onClose={() => setIsLogoutModalOpen(false)}
				openLogout={() => setIsLogoutModalOpen(true)}
				modalLogout={isLogoutModalOpen}
				toggleTheme={toggleTheme}
				isDarkTheme={isDarkTheme}
			/>

			{isMobileMenuOpen && <NavbarOverlay onClick={closeMobileMenu} />}

			{isRegisterModalOpen && (
				<Register
					isVisible={isRegisterModalOpen}
					onClose={() => setIsRegisterModalOpen(false)}
					openLogin={openLogin}
				/>
			)}

			{isLoginModalOpen && (
				<Login
					isVisible={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
					openRegister={openRegister}
				/>
			)}

			{isLogoutModalOpen && (
				<ModalLogout onClose={() => setIsLogoutModalOpen(false)} />
			)}
		</Section>
	);
};

export default Navbar;
