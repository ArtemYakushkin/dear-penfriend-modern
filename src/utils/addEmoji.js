export const addEmoji = (emoji, setText, setShowEmojiPicker) => {
	setText((prev) => prev + emoji.native);
	setShowEmojiPicker(false);
};
