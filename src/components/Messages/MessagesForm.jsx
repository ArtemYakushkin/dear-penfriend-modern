import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import Avatar from '../Avatar';
import ModalGifSearch from '../Modals/ModalGifSearch';
import Register from '../Register';
import Login from '../Login';
import { useAuthStore } from '../../store/useAuthStore';
import { useResponsive } from '../../hooks/useResponsive';
import { useMessagesStore } from '../../store/useMessagesStore';
import { fetchAuthorNickname } from '../../utils/messageFormUtils';
import { isEnglishOnly } from '../../utils/validation';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useAuthModals } from '../../hooks/useAuthModals';
import { addEmoji } from '../../utils/addEmoji';
import {
	Form,
	Wrap,
	Preview,
	BtnClose,
	Textarea,
	Error,
	Options,
	Inner,
	BtnEmoji,
	BtnSubmit,
	EmojiModal,
	BtnUnReg,
} from '../../style/FormStyles';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
import { HiOutlineGif } from 'react-icons/hi2';
import { GoImage } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';

const MessagesForm = ({ authorId }) => {
	const user = useAuthStore((s) => s.user);
	const sendMessage = useMessagesStore((state) => state.sendMessage);
	const [authorNickname, setAuthorNickname] = useState('');
	const [text, setText] = useState('');
	const [image, setImage] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [gif, setGif] = useState(null);
	const [error, setError] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [isGifModalOpen, setIsGifModalOpen] = useState(false);
	const emojiPickerRef = useRef(null);
	const {
		isRegisterModalOpen,
		setIsRegisterModalOpen,
		isLoginModalOpen,
		setIsLoginModalOpen,
		openLogin,
		openRegister,
	} = useAuthModals();
	useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));
	useBodyScrollLock(isGifModalOpen);

	const { isMobile, isTablet } = useResponsive();

	useEffect(() => {
		if (authorId) {
			fetchAuthorNickname(authorId).then(setAuthorNickname);
		}
	}, [authorId]);

	const handleSend = async () => {
		setError('');

		if (!text.trim() && !imageFile && !gif) {
			return setError("You can't send an empty message.");
		}

		if (text.trim() && !isEnglishOnly(text.trim())) {
			return setError('Only English characters are allowed.');
		}

		try {
			await sendMessage({
				authorId,
				user,
				text: text.trim(),
				imageFile,
				gif,
			});

			setText('');
			setImage(null);
			setImageFile(null);
			setGif(null);

			toast.success('Message sent successfully!');
		} catch {
			toast.error('Failed to send message.');
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setImageFile(file);
		setImage(URL.createObjectURL(file));
	};

	return (
		<Form>
			{!user ? (
				<BtnUnReg onClick={openRegister}>Login to leave a message for {authorNickname}</BtnUnReg>
			) : (
				<>
					<Avatar
						photo={user?.photoURL}
						name={user?.displayName}
						style={{
							width: isMobile ? '40px' : isTablet ? '40px' : '48px',
							height: isMobile ? '40px' : isTablet ? '40px' : '48px',
							flexShrink: '0',
						}}
					/>
					<Wrap>
						{gif && (
							<Preview>
								<img src={gif} alt="gif-preview" />
								<BtnClose onClick={() => setGif(null)}>
									<IoIosCloseCircleOutline size={24} />
								</BtnClose>
							</Preview>
						)}

						{image && (
							<Preview>
								<img src={image} alt="preview" />
								<BtnClose
									onClick={() => {
										setImage(null);
										setImageFile(null);
									}}
								>
									<IoIosCloseCircleOutline size={24} />
								</BtnClose>
							</Preview>
						)}

						<Textarea
							className="form-textarea"
							placeholder="Write a message..."
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>

						{error && <Error>{error}</Error>}

						<Options>
							<Inner>
								<BtnEmoji type="button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
									<BsEmojiSmile size={24} />
								</BtnEmoji>
								<BtnEmoji
									style={{ width: '32px', height: '32px' }}
									type="button"
									onClick={() => setIsGifModalOpen(true)}
								>
									<HiOutlineGif size={32} />
								</BtnEmoji>
								<label
									style={{
										width: '28px',
										height: '28px',
										color: 'var(--color-grey-change)',
										cursor: 'pointer',
									}}
								>
									<GoImage size={28} />
									<input type="file" accept="image/*" hidden onChange={handleImageChange} />
								</label>
							</Inner>
							<BtnSubmit onClick={handleSend}>
								<IoSend size={isMobile ? 24 : 36} />
							</BtnSubmit>
						</Options>

						{showEmojiPicker && (
							<EmojiModal ref={emojiPickerRef}>
								<EmojiPicker
									theme="light"
									onEmojiClick={(emojiData) => addEmoji(emojiData, setText, setShowEmojiPicker)}
								/>
							</EmojiModal>
						)}
					</Wrap>
				</>
			)}

			<ModalGifSearch
				isOpen={isGifModalOpen}
				onClose={() => setIsGifModalOpen(false)}
				onGifSelect={(url) => {
					setGif(url);
					setIsGifModalOpen(false);
				}}
			/>

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
		</Form>
	);
};

export default MessagesForm;
