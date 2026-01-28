import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';

import { MdOutlineRocketLaunch } from 'react-icons/md';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { LuSun, LuMoon } from 'react-icons/lu';
import { FaQuestion } from 'react-icons/fa';

import { useAuthStore } from '../store/useAuthStore';
import { ThemeContext } from '../context/ThemeContext';

import ModalLogout from './Modals/ModalLogout';

const Mobile = styled.div`
	position: fixed;
	top: 82px;
	left: 0;
	width: 100%;
	max-height: 0;
	background: var(--bg-auth-form);
	overflow: hidden;
	z-index: 1000;
	box-shadow: 0px 4px 16px 0px #094ebe40;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	opacity: 0;
	transform: translateY(-10px);
	transition:
		max-height 0.4s ease-in-out,
		opacity 0.3s ease,
		transform 0.3s ease;

	&.mobile-open {
		max-height: 410px;
		opacity: 1;
		transform: translateY(0);
	}
`;

const MobileContent = styled.div`
	padding: 20px 0px;
`;

const MobileNickname = styled.div`
	padding: 20px;
	border-bottom: 1px solid var(--color-grey-change);

	h4 {
		font-weight: 700;
		font-size: 16px;
		line-height: 16px;
		color: var(--color-grey-change);
	}
`;

const MobileItem = styled.li`
	padding: 20px;
`;

const MobileLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 12px;
	color: var(--color-grey-change);
	cursor: pointer;

	p {
		font-weight: 400;
		font-size: 16px;
		line-height: 19.2px;
	}
`;

const MobileMenu = ({ isOpen, closeMenu, openLogout, modalLogout }) => {
	const { user } = useAuthStore();
	const { theme, toggleTheme } = useContext(ThemeContext);
	const isDarkTheme = theme === 'dark';

	const handleExit = () => {
		closeMenu();
		openLogout();
	};

	return (
		<Mobile className={`${isOpen ? 'mobile-open' : ''}`}>
			{user ? (
				<MobileContent>
					<MobileNickname>
						<h4>{user.displayName || 'User'}</h4>
					</MobileNickname>
					<ul>
						<MobileItem>
							<MobileLink to={'/about'} onClick={closeMenu}>
								<MdOutlineRocketLaunch size={24} />
								<p>About project</p>
							</MobileLink>
						</MobileItem>
						<MobileItem>
							<MobileLink to={'/faqs'} onClick={closeMenu}>
								<FaQuestion size={24} />
								<p>FAQs</p>
							</MobileLink>
						</MobileItem>
						<MobileItem onClick={toggleTheme}>
							<MobileLink>
								{isDarkTheme ? <LuSun size={24} /> : <LuMoon size={24} />}
								<p>Change theme to dark</p>
							</MobileLink>
						</MobileItem>
						<MobileItem>
							<MobileLink to={'/profile'} onClick={closeMenu}>
								<FiUser size={24} />
								<p>Profile</p>
							</MobileLink>
						</MobileItem>
						<MobileItem>
							<MobileLink onClick={handleExit}>
								<FiLogOut size={24} style={{ transform: 'rotate(180deg)' }} />
								<p>Logout</p>
							</MobileLink>
						</MobileItem>
					</ul>
				</MobileContent>
			) : (
				<MobileContent>
					<>
						<MobileItem>
							<MobileLink to={'/about'} onClick={closeMenu}>
								<MdOutlineRocketLaunch size={24} />
								<p>About project</p>
							</MobileLink>
						</MobileItem>
						<MobileItem>
							<MobileLink to={'/faqs'} onClick={closeMenu}>
								<FaQuestion size={24} />
								<p>FAQs</p>
							</MobileLink>
						</MobileItem>
						<MobileItem onClick={toggleTheme}>
							<MobileLink>
								{isDarkTheme ? <LuSun size={24} /> : <LuMoon size={24} />}
								<p>Change theme to dark</p>
							</MobileLink>
						</MobileItem>
					</>
				</MobileContent>
			)}

			{modalLogout && <ModalLogout />}
		</Mobile>
	);
};

export default MobileMenu;
