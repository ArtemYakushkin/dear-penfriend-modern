export const addEmoji = (emojiData, setText, setShowEmojiPicker) => {
	setText((prev) => prev + emojiData.emoji);
	setShowEmojiPicker(false);
};
