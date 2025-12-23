import {
	ModalInner,
	ModalImage,
	ModalContent,
	ModalSubtitle,
	ModalSubtext,
} from '../style/ModalStyles';

import Star from '../assets/star.png';

const QuizSuccessMessage = () => (
	<ModalInner>
		<ModalImage style={{ height: '140px' }}>
			<img
				style={{
					position: 'absolute',
					top: '-3px',
					left: '50%',
					transform: 'translateX(-50%) scale(1.1)',
				}}
				src="/robby-funny.svg"
				alt="robot"
			/>
		</ModalImage>
		<ModalContent
			style={{
				borderTop: '14px solid var(--color-green)',
				marginBottom: '0px',
			}}
		>
			<img className="quiz-happy-img-star" src={Star} alt="star" />
			<ModalSubtitle
				style={{
					color: 'var(--color-green)',
				}}
			>
				Congratulations!
			</ModalSubtitle>
			<ModalSubtext>
				This is the correct answer. You are very knowledgeable!
			</ModalSubtext>
		</ModalContent>
	</ModalInner>
);

export default QuizSuccessMessage;
