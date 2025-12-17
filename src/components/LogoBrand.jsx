import styled from 'styled-components';
import { useResponsive } from '../hooks/useResponsive';
import { Link } from 'react-router-dom';

import Logo1 from '../assets/Logo/logo-1.svg';
import Logo2 from '../assets/Logo/logo-2.svg';
import Logo1Mob from '../assets/Logo/logo-1-mobile.svg';
import Logo2Mob from '../assets/Logo/logo-2-mobile.svg';

const Logo = styled(Link)`
	display: block;
	width: 79px;
	height: 72px;
	position: relative;

	div {
		position: absolute;
		bottom: 0;
	}

	p {
		font-family: Unbounded;
		font-weight: 700;
		font-size: 13px;
		line-height: 13px;
		letter-spacing: -1%;
		color: var(--color-accent);
	}

	.logo-img-1 {
		position: absolute;
		top: 0;
		left: 0;
	}

	.logo-img-2 {
		position: absolute;
		top: 11px;
		left: 31px;
	}

	@media (max-width: 767px) {
		width: 55px;
		height: 48px;
		position: relative;

		div {
			position: absolute;
			bottom: 0;
		}

		p {
			font-size: 9px;
			line-height: 9px;
			letter-spacing: -1%;
		}

		.logo-img-1 {
			position: absolute;
			top: 0;
			left: 0;
		}

		.logo-img-2 {
			position: absolute;
			top: 7px;
			left: 21px;
		}
	}
`;

const LogoBrand = ({ style }) => {
	const { isMobile } = useResponsive();

	return (
		<Logo className="logo" to={'/'}>
			{isMobile ? (
				<>
					<img className="logo-img-1" src={Logo1Mob} alt="logo" />
					<img className="logo-img-2" src={Logo2Mob} alt="logo" />
				</>
			) : (
				<>
					<img className="logo-img-1" src={Logo1} alt="logo" />
					<img className="logo-img-2" src={Logo2} alt="logo" />
				</>
			)}
			<div>
				<p style={style}>Dear</p>
				<p style={style}>Penfriend</p>
			</div>
		</Logo>
	);
};

export default LogoBrand;
