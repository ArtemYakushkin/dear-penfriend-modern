import Gmail from '../../assets/SocialIcon/gmail.png';
import Telegram from '../../assets/SocialIcon/telegram.png';
import Viber from '../../assets/SocialIcon/viber.png';

import ButtonCloseModal from '../Buttons/ButtonCloseModal';
import { ModalOverlay, Modal, ModalWrap, ModalTitle, ModalActions } from '../../style/ModalStyles';

const ModalHelp = ({ onClose }) => {
	return (
		<ModalOverlay>
			<Modal style={{ width: '406px' }}>
				<ButtonCloseModal onClose={onClose} />

				<ModalWrap>
					<ModalTitle>
						If you experience any technical issues with this website or have suggestions for improving the
						platform, please feel free to contact us using any available method.
					</ModalTitle>
					<ModalActions>
						<a href="mailto:zimberger29101985@gmail.com" target="_blank" rel="noreferrer">
							<img src={Gmail} alt="" />
						</a>
						<a href="viber://chat?number=+380507025708" target="_blank" rel="noreferrer">
							<img src={Viber} alt="" />
						</a>
						<a href="tg://resolve?domain=ArtemYakushkin" target="_blank" rel="noreferrer">
							<img src={Telegram} alt="" />
						</a>
					</ModalActions>
				</ModalWrap>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalHelp;
