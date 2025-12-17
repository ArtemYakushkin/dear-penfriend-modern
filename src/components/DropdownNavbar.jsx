import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { LuSun, LuMoon } from 'react-icons/lu';

import { useAuthStore } from '../store/useAuthStore';
import { ThemeContext } from '../context/ThemeContext';

const Arrow = styled.div`
	position: relative;
	width: 24px;
	height: 24px;
	color: var(--color-black-change);
	cursor: pointer;

	@media (max-width: 767px) {
		display: none;
	}
`;

const List = styled.div`
	position: absolute;
	left: -205px;
	top: 42px;
	z-index: 99;
	width: 228px;
	background-color: var(--bg-drop-list);
	border-radius: 10px;
	box-shadow: 0px 0px 2px 0px #01010129;
`;

const Nickname = styled.div`
	padding: 16px 0 16px 20px;
	border-bottom: 2px solid var(--color-grey-change);
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-grey-change);
`;

const Item = styled.div`
	padding: 12px 0px 12px 20px;
	display: flex;
	align-items: center;
	gap: 12px;
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-grey-change);
	cursor: pointer;

	&:hover {
		background-color: var(--bg-hover-unchange);
	}
`;

const DropdownNavbar = ({
	toggleDropdown,
	dropdownRef,
	isOpen,
	setIsLogoutModalOpen,
}) => {
	const { user } = useAuthStore();
	const { theme, toggleTheme } = useContext(ThemeContext);
	const isDarkTheme = theme === 'dark';
	const navigate = useNavigate();

	return (
		<Arrow onClick={toggleDropdown} ref={dropdownRef}>
			{isOpen ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
			{isOpen && (
				<List>
					<Nickname>
						<p>{user.displayName || 'User'}</p>
					</Nickname>

					<Item onClick={() => navigate('/profile')}>
						<FiUser size={24} />
						<p>Profile</p>
					</Item>

					<Item onClick={toggleTheme}>
						{isDarkTheme ? (
							<LuSun size={24} />
						) : (
							<LuMoon size={24} />
						)}
						<p>Change theme to dark</p>
					</Item>

					<Item onClick={() => setIsLogoutModalOpen(true)}>
						<FiLogOut
							style={{
								transform: 'rotate(180deg)',
							}}
							size={24}
						/>
						<p>Logout</p>
					</Item>
				</List>
			)}
		</Arrow>
	);
};

export default DropdownNavbar;
