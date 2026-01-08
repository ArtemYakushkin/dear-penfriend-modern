import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

import ModalGifSearch from '../Modals/ModalGifSearch';
import { useMessageRepliesStore } from '../../store/useMessageRepliesStore';
import { isEnglishOnly } from '../../utils/validation';
import { useResponsive } from '../../hooks/useResponsive';
import { addEmoji } from '../../utils/addEmoji';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

import { Form, Textarea, Error, Options, Wrap } from '../../style/FormReplyStyles';
import { Preview, BtnClose, BtnEmoji, BtnSubmit, EmojiModal } from '../../style/FormStyles';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
import { HiOutlineGif } from 'react-icons/hi2';
import { GoImage } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';

const MessageReplyForm = ({ replyToMessage, currentUser }) => {
	const sendReply = useMessageRepliesStore((s) => s.sendReply);

	const [text, setText] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [image, setImage] = useState(null);
	const [gif, setGif] = useState(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [isGifModalOpen, setIsGifModalOpen] = useState(false);
	const [error, setError] = useState('');
	const { isMobile, isTablet } = useResponsive();
	const emojiPickerRef = useRef(null);
	useBodyScrollLock(isGifModalOpen);

	const handleSend = async () => {
		setError('');

		if (!text.trim() && !imageFile && !gif) {
			return setError("You can't send an empty message.");
		}

		if (text.trim() && !isEnglishOnly(text.trim())) {
			return setError('Only English characters are allowed.');
		}

		try {
			await sendReply({
				replyToMessage,
				currentUser,
				text: text.trim(),
				imageFile,
				gif,
			});

			setText('');
			setImage(null);
			setImageFile(null);
			setGif(null);
			setShowEmojiPicker(false);

			toast.success('Reply sent successfully!');
		} catch (e) {
			console.error(e);
			toast.error('Failed to send reply.');
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setImageFile(file);
		setImage(URL.createObjectURL(file));
	};

	return (
		<>
			<Form>
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
						<BtnClose onClick={() => setImage(null)}>
							<IoIosCloseCircleOutline size={24} />
						</BtnClose>
					</Preview>
				)}

				<Textarea placeholder="Reply to message..." value={text} onChange={(e) => setText(e.target.value)} />

				{error && <Error>{error}</Error>}

				<Options>
					<Wrap>
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
					</Wrap>

					<BtnSubmit type="button" onClick={handleSend}>
						<IoSend size={isTablet || isMobile ? 24 : 36} />
					</BtnSubmit>
				</Options>
			</Form>

			{showEmojiPicker && (
				<EmojiModal ref={emojiPickerRef}>
					<EmojiPicker
						theme="light"
						onEmojiClick={(emojiData) => addEmoji(emojiData, setText, setShowEmojiPicker)}
					/>
				</EmojiModal>
			)}

			<ModalGifSearch
				isOpen={isGifModalOpen}
				onClose={() => setIsGifModalOpen(false)}
				onGifSelect={(url) => {
					setGif(url);
					setIsGifModalOpen(false);
				}}
			/>
		</>
	);
};

export default MessageReplyForm;
