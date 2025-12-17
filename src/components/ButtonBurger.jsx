import styled from 'styled-components';

const Button = styled.button`
	display: none;

	@media (max-width: 767px) {
		width: 24px;
		height: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: transform 0.4s ease-in-out;

		span {
			display: block;
			width: 24px;
			height: 3px;
			border-radius: 30px;
			background-color: var(--color-accent);
			transition: transform 0.4s ease, opacity 0.4s ease;
		}

		/* --- OPEN STATE --- */

		${({ $isOpen }) =>
			$isOpen &&
			`
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        span:nth-child(2) {
          transform: rotate(-45deg) translate(0px, 0px);
        }

        span:nth-child(3) {
          opacity: 0;
        }
      `}
	}
`;

const ButtonBurger = ({ isMobileMenuOpen, toggleMobileMenu }) => {
	return (
		<Button $isOpen={isMobileMenuOpen} onClick={toggleMobileMenu}>
			<span></span>
			<span></span>
			<span></span>
		</Button>
	);
};

export default ButtonBurger;
