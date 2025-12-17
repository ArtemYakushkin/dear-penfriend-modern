import { VscError } from 'react-icons/vsc';

import {
	InputGroup,
	InputContainer,
	InputMain,
	InputPlaceholder,
	InputError,
} from '../style/InputStyles';

const InputText = ({ value, onChange, errorMessage, placeholder }) => {
	return (
		<InputGroup>
			<InputContainer>
				<InputMain
					className={`${errorMessage ? 'input-error' : ''}`}
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<InputPlaceholder className="input-placeholder">
					{placeholder}
				</InputPlaceholder>
			</InputContainer>
			{errorMessage && (
				<InputError className="input-error">
					<span>
						<VscError size={16} />
					</span>
					{errorMessage}
				</InputError>
			)}
		</InputGroup>
	);
};

export default InputText;
