import { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../context/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';

import { LuSun, LuMoon } from 'react-icons/lu';

const Switcher = styled.div`
	display: flex;
	align-items: center;
	flex-shrink: 0;
	gap: 13px;
	margin-left: auto;
`;

const SwitcherTitle = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-light);
	margin-right: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		display: none;
	}

	@media (max-width: 767px) {
		display: none;
	}
`;

const SwitcherBox = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const SwitcherLabel = styled.label`
	color: #4f5e78;
`;

const SwitcherInput = styled.input`
	display: none;

	&:checked + .switcher-toggle {
		background-color: var(--color-dark-blue);
	}

	&:checked + .switcher-toggle::after {
		transform: translateX(20px);
	}
`;

const SwitcherToggle = styled.div`
	position: relative;
	width: 40px;
	height: 20px;
	background-color: var(--color-accent);
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&::after {
		content: '';
		position: absolute;
		width: 16px;
		height: 16px;
		background-color: var(--bg-switcher);
		border-radius: 50%;
		top: 2px;
		left: 2px;
		transition: transform 0.3s ease;
	}
`;

const SwitcherTheme = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const isDarkTheme = theme === 'dark';
	const { isMobile } = useResponsive();

	return (
		<Switcher>
			<SwitcherTitle>Site theme:</SwitcherTitle>
			{isMobile ? (
				<button
					onClick={toggleTheme}
					style={{ color: 'var(--color-accent)' }}
				>
					{isDarkTheme ? <LuSun size={24} /> : <LuMoon size={24} />}
				</button>
			) : (
				<SwitcherBox>
					<LuSun
						onClick={toggleTheme}
						size={24}
						style={{
							color: 'var(--color-accent)',
							opacity: isDarkTheme ? '0.4' : '1',
							cursor: 'pointer',
						}}
					/>
					<SwitcherLabel htmlFor="theme-toggle">
						<SwitcherInput
							type="checkbox"
							id="theme-toggle"
							checked={isDarkTheme}
							onChange={toggleTheme}
						/>
						<SwitcherToggle className="switcher-toggle"></SwitcherToggle>
					</SwitcherLabel>
					<LuMoon
						onClick={toggleTheme}
						size={24}
						style={{
							color: 'var(--color-accent)',
							opacity: isDarkTheme ? '1' : '0.4',
							cursor: 'pointer',
						}}
					/>
				</SwitcherBox>
			)}
		</Switcher>
	);
};

export default SwitcherTheme;
