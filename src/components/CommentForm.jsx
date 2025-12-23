import { useState, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import { useAuthStore } from '../store/useAuthStore';
import { submitComment } from '../utils/commentsUtils';
import { useClickOutside } from '../hooks/useClickOutside';
import { useResponsive } from '../hooks/useResponsive';
import { useAuthModals } from '../hooks/useAuthModals';
import { addEmoji } from '../utils/addEmoji';

import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';

import Avatar from './Avatar';
import Register from './Register';
import Login from './Login';
import { Container } from '../style/Container';
import {
	Form,
	Wrap,
	Textarea,
	Error,
	Options,
	BtnEmoji,
	BtnSubmit,
	EmojiModal,
	BtnUnReg,
} from '../style/FormStyles';

const CommentForm = ({ postId }) => {
	const user = useAuthStore((s) => s.user);
	const [text, setText] = useState('');
	const [error, setError] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const emojiPickerRef = useRef(null);
	useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));
	const { isMobile, isTablet } = useResponsive();
	const {
		isRegisterModalOpen,
		setIsRegisterModalOpen,
		isLoginModalOpen,
		setIsLoginModalOpen,
		openLogin,
		openRegister,
	} = useAuthModals();

	const content = (
		<>
			<Form>
				{user ? (
					<>
						<Avatar
							photo={user?.photoURL}
							name={user?.displayName}
							style={{
								width: isMobile
									? '40px'
									: isTablet
									? '40px'
									: '48px',
								height: isMobile
									? '40px'
									: isTablet
									? '40px'
									: '48px',
								flexShrink: '0',
							}}
						/>
						<Wrap>
							<form
								id="commentForm"
								onSubmit={(e) => {
									e.preventDefault();
									submitComment({
										text,
										user,
										postId,
										setError,
										onSuccess: () => setText(''),
									});
								}}
							>
								<Textarea
									value={text}
									onChange={(e) => setText(e.target.value)}
									placeholder="Add your comment here"
								/>
							</form>

							{error && <Error>{error}</Error>}

							<Options>
								<BtnEmoji
									type="button"
									onClick={() =>
										setShowEmojiPicker(!showEmojiPicker)
									}
								>
									<BsEmojiSmile size={24} />
								</BtnEmoji>

								<BtnSubmit type="submit" form="commentForm">
									<IoSend
										size={
											isTablet || isMobile ? '24' : '36'
										}
									/>
								</BtnSubmit>
							</Options>

							{showEmojiPicker && (
								<EmojiModal ref={emojiPickerRef}>
									<Picker
										data={data}
										onEmojiSelect={(emoji) =>
											addEmoji(
												emoji,
												setText,
												setShowEmojiPicker,
											)
										}
										theme="light"
									/>
								</EmojiModal>
							)}
						</Wrap>
					</>
				) : (
					<BtnUnReg onClick={openRegister}>
						Log in to comment
					</BtnUnReg>
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
			</Form>
		</>
	);

	return isMobile ? <Container>{content}</Container> : content;
};

export default CommentForm;
