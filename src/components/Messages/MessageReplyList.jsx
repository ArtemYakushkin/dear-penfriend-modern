import { useEffect, useState } from 'react';
import styled from 'styled-components';

import MessageReplyItem from './MessageReplyItem';
import ModalEdit from '../Modals/ModalEdit';
import ModalDelete from '../Modals/ModalDelete';
import ModalImage from '../Modals/ModalImage';
import InfoBoard from '../InfoBoard';
import { useAuthStore } from '../../store/useAuthStore';
import { useMessageRepliesStore } from '../../store/useMessageRepliesStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	@media (max-width: 767px) {
		gap: 10px;
	}
`;

const MessageReplyList = ({ messageId }) => {
	const currentUser = useAuthStore((s) => s.user);
	const { replies, subscribe, cleanup, editReply, deleteReply } = useMessageRepliesStore();
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [selectedReply, setSelectedReply] = useState(null);
	const [editedText, setEditedText] = useState('');
	const [modalImageUrl, setModalImageUrl] = useState(null);
	const [isModalImage, setIsModalImage] = useState(false);
	useBodyScrollLock(isEditing || isDeleting || isModalImage);

	useEffect(() => {
		if (!messageId) return;

		subscribe(messageId);
		return cleanup;
	}, [messageId, subscribe, cleanup]);

	const handleEditReply = async () => {
		if (!selectedReply || !editedText.trim()) return;

		await editReply(selectedReply.id, editedText.trim());
		setIsEditing(false);
		setSelectedReply(null);
		setEditedText('');
	};

	const handleDeleteReply = async () => {
		if (!selectedReply) return;

		await deleteReply(selectedReply.id);
		setIsDeleting(false);
		setSelectedReply(null);
	};

	if (replies.length === 0) {
		return <InfoBoard message={'There is no responses to the message.'} />;
	}

	return (
		<>
			<List>
				{replies.map((reply) => (
					<MessageReplyItem
						key={reply.id}
						reply={reply}
						currentUser={currentUser}
						setIsEditing={setIsEditing}
						setSelectedReply={setSelectedReply}
						setEditedText={setEditedText}
						setIsDeleting={setIsDeleting}
						setModalImageUrl={setModalImageUrl}
						setIsModalImage={setIsModalImage}
					/>
				))}
			</List>

			{isEditing && (
				<ModalEdit
					text={editedText}
					onTextChange={setEditedText}
					onSave={handleEditReply}
					onCancel={() => {
						setIsEditing(false);
						setSelectedReply(null);
						setEditedText('');
					}}
				/>
			)}

			{isDeleting && (
				<ModalDelete
					onConfirm={handleDeleteReply}
					onCancel={() => {
						setIsDeleting(false);
						setSelectedReply(null);
					}}
				/>
			)}

			{isModalImage && (
				<ModalImage imageUrl={modalImageUrl} isOpen={isModalImage} onClose={() => setIsModalImage(false)} />
			)}
		</>
	);
};

export default MessageReplyList;
