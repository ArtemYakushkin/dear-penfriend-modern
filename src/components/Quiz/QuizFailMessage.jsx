import { useResponsive } from '../../hooks/useResponsive';
import { ModalInner, ModalImage, ModalContent, ModalSubtitle, ModalSubtext } from '../../style/ModalStyles';

const QuizFailMessage = () => {
	const { isMobile } = useResponsive();

	return (
		<ModalInner>
			<ModalImage style={{ height: '135px' }}>
				<img
					style={{
						position: 'absolute',
						top: '0px',
						left: '50%',
						transform: 'translateX(-50%) scale(1.2)',
					}}
					src="/robby-base.svg"
					alt="robot"
				/>
				<img
					style={{
						position: 'absolute',
						top: '113px',
						left: isMobile ? '185px' : '255px',
						zIndex: '103',
						transform: 'scale(1.2)',
					}}
					src="/robby-hand.svg"
					alt="robot hand"
				/>
			</ModalImage>
			<ModalContent
				style={{
					borderTop: '14px solid var(--color-orange)',
					zIndex: '102',
					marginBottom: '0px',
				}}
			>
				<ModalSubtitle style={{ color: 'var(--color-orange)' }}>Oops!</ModalSubtitle>
				<ModalSubtext>Not correct this time. Don’t worry — try again!</ModalSubtext>
			</ModalContent>
		</ModalInner>
	);
};

export default QuizFailMessage;
