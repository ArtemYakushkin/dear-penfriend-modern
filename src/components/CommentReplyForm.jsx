import { useState, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import { useAuthStore } from '../store/useAuthStore';
import { useAuthModals } from '../hooks/useAuthModals';
import { submitReply } from '../utils/submitReply';
import { useResponsive } from '../hooks/useResponsive';
import { addEmoji } from '../utils/addEmoji';
import { useClickOutside } from '../hooks/useClickOutside';

import Register from './Register';
import Login from './Login';
import { BtnUnReg, BtnEmoji, BtnSubmit, EmojiModal } from '../style/FormStyles';
import { Form, Textarea, Error, Options, Wrap } from '../style/FormReplyStyles';

import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';

const CommentReplyForm = ({ postId, commentId }) => {
	const user = useAuthStore((s) => s.user);
	const [text, setText] = useState('');
	const [error, setError] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { isMobile, isTablet } = useResponsive();
	const emojiPickerRef = useRef(null);
	useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

	const {
		isRegisterModalOpen,
		setIsRegisterModalOpen,
		isLoginModalOpen,
		setIsLoginModalOpen,
		openLogin,
		openRegister,
	} = useAuthModals();

	return (
		<>
			{user ? (
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						submitReply({
							text,
							user,
							postId,
							commentId,
							setError,
							onSuccess: () => setText(''),
						});
					}}
				>
					<Textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Add your reply here"
						rows={3}
					/>

					{error && <Error>{error}</Error>}

					<Options>
						<Wrap>
							<BtnEmoji
								type="button"
								onClick={() =>
									setShowEmojiPicker(!showEmojiPicker)
								}
							>
								<BsEmojiSmile size={24} />
							</BtnEmoji>
						</Wrap>

						<BtnSubmit type="submit">
							<IoSend
								size={isTablet || isMobile ? 24 : 30}
								color="var(--color-accent)"
							/>
						</BtnSubmit>
					</Options>

					{showEmojiPicker && (
						<EmojiModal ref={emojiPickerRef}>
							<Picker
								data={data}
								onEmojiSelect={(emoji) =>
									addEmoji(emoji, setText, setShowEmojiPicker)
								}
								theme="light"
							/>
						</EmojiModal>
					)}
				</Form>
			) : (
				<BtnUnReg onClick={openRegister}>Log in to reply</BtnUnReg>
			)}

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
		</>
	);
};

export default CommentReplyForm;
