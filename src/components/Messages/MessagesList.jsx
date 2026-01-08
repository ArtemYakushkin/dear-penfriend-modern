import { useState, useEffect } from 'react';
import styled from 'styled-components';

import MessageItem from './MessageItem';
import ModalImage from '../Modals/ModalImage';
import ModalEdit from '../Modals/ModalEdit';
import ModalDelete from '../Modals/ModalDelete';
import { useAuthStore } from '../../store/useAuthStore';
import { useMessagesStore } from '../../store/useMessagesStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

const Wrap = styled.div`
	padding: 30px 0 30px 0;
	border: 1px solid var(--bg-mode);
	border-radius: 30px;
	display: flex;
	flex-direction: column;
	max-height: 700px;
	background-color: var(--bg-post-wrap);

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 30px 20px 30px 20px;
		max-height: none;
	}

	@media (max-width: 767px) {
		padding: 0px;
		border: none;
		border-radius: 0px;
		display: flex;
		flex-direction: column;
		max-height: none;
		background-color: transparent;
	}
`;

const Scroll = styled.div`
	position: relative;
	overflow-y: auto;
	max-height: 100%;
	padding-right: 28px;
	display: flex;
	gap: 12px;
	margin-right: 14px;

	@media (min-width: 768px) and (max-width: 1259px) {
		position: static;
		overflow-y: visible;
		max-height: none;
		padding-right: 0px;
		display: block;
		gap: 0px;
		margin-right: 0px;
	}

	@media (max-width: 767px) {
		position: static;
		overflow-y: visible;
		max-height: none;
		padding-right: 0px;
		display: block;
		gap: 0px;
		margin-right: 0px;
	}
`;

const List = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 30px;
	margin-left: 40px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 20px;
		margin-left: 0px;
	}

	@media (max-width: 767px) {
		gap: 20px;
		margin-left: 0px;
	}
`;

const MessagesList = ({ authorId, showReplyForm = false, isOwnerPage = false }) => {
	const user = useAuthStore((s) => s.user);
	const { messages, subscribe, deleteMessage, updateMessage } = useMessagesStore();

	const [editingMessage, setEditingMessage] = useState(null);
	const [deletingMessage, setDeletingMessage] = useState(null);
	const [editedText, setEditedText] = useState('');
	const [modalImageUrl, setModalImageUrl] = useState(null);
	const [isModalImage, setIsModalImage] = useState(false);
	const [activeMessageId, setActiveMessageId] = useState(null);

	useBodyScrollLock(isModalImage || editingMessage || deletingMessage);

	useEffect(() => {
		if (!authorId) return;
		const unsub = subscribe(authorId);
		return unsub;
	}, [authorId, subscribe]);

	if (!user) return null;

	const toggleReplyList = (messageId) => {
		setActiveMessageId((prevActiveId) => (prevActiveId === messageId ? null : messageId));
	};

	return (
		<>
			<Wrap>
				<Scroll>
					<List>
						{messages.map((message) => (
							<MessageItem
								key={message.id}
								message={message}
								user={user}
								isOwnerPage={isOwnerPage}
								showReplyForm={showReplyForm}
								onEdit={() => {
									setEditingMessage(message);
									setEditedText(message.message);
								}}
								onDelete={() => setDeletingMessage(message)}
								setModalImageUrl={setModalImageUrl}
								setIsModalImage={setIsModalImage}
								activeMessageId={activeMessageId}
								toggleReplyList={toggleReplyList}
							/>
						))}
					</List>
				</Scroll>
			</Wrap>

			{isModalImage && <ModalImage imageUrl={modalImageUrl} onClose={() => setIsModalImage(false)} />}

			{editingMessage && (
				<ModalEdit
					text={editedText}
					onTextChange={setEditedText}
					onSave={async () => {
						await updateMessage(editingMessage.id, editedText);
						setEditingMessage(null);
					}}
					onCancel={() => setEditingMessage(null)}
				/>
			)}

			{deletingMessage && (
				<ModalDelete
					onConfirm={async () => {
						await deleteMessage(deletingMessage.id);
						setDeletingMessage(null);
					}}
					onCancel={() => setDeletingMessage(null)}
				/>
			)}
		</>
	);
};

export default MessagesList;
