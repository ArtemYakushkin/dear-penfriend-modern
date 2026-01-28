import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
	display: flex;
	align-items; center;
	gap: 28px;

	@media (max-width: 767px) {
		display: none;
	}
`;

const NavItem = styled(Link)`
	position: relative;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-accent-change);
	transition: color 0.3s ease-in-out;

	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -1px;
		width: 0;
		height: 1px;
		background-color: var(--color-accent-change);
		transition: width 0.3s ease-in-out;
	}

	&:hover::after {
		width: 100%;
	}
`;

const MenuNav = () => {
	return (
		<Wrap>
			<NavItem to={'/about'}>About project</NavItem>
			<NavItem to={'/faqs'}>FAQs</NavItem>
		</Wrap>
	);
};

export default MenuNav;
