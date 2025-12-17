import { FiUpload } from 'react-icons/fi';

import {
	InputUpload,
	InputPreview,
	InputChangeBox,
	InputUploadScreen,
	InputScreen,
} from '../style/InputStyles';

const InputFile = ({
	imagePreview,
	handleImageChange,
	inputId = 'imageInput',
}) => {
	return (
		<InputUpload>
			<input
				type="file"
				id={inputId}
				accept="image/*"
				onChange={handleImageChange}
				className="input-image"
			/>

			{imagePreview ? (
				<InputPreview>
					<img src={imagePreview} alt="Preview" />

					<label htmlFor={inputId}>
						<InputChangeBox className="input-change-box">
							<span>Change Photo</span>
						</InputChangeBox>
					</label>
				</InputPreview>
			) : (
				<InputUploadScreen htmlFor={inputId}>
					<InputScreen>
						<span>
							<FiUpload size={24} />
						</span>
						<p>Select file</p>
					</InputScreen>
				</InputUploadScreen>
			)}
		</InputUpload>
	);
};

export default InputFile;
