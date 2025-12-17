import { PiEyeClosed, PiEye } from 'react-icons/pi';
import { VscError } from 'react-icons/vsc';

import {
	InputGroup,
	InputContainerPass,
	InputMain,
	InputPlaceholder,
	InputErrorFix,
	InputPassEye,
	InputShowText,
} from '../style/InputStyles';

const InputPassword = ({
	value,
	onChange,
	showPassword,
	togglePasswordVisibility,
	errorMessage,
	placeholder,
}) => {
	return (
		<InputGroup>
			<InputContainerPass>
				<InputMain
					className={`${errorMessage ? 'input-error' : ''}`}
					type={showPassword ? 'text' : 'password'}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<InputPlaceholder className="input-placeholder">
					{placeholder}
				</InputPlaceholder>
				<InputPassEye onClick={togglePasswordVisibility}>
					{showPassword ? (
						<PiEye size={24} />
					) : (
						<PiEyeClosed size={24} />
					)}
				</InputPassEye>
				<InputShowText>Show password</InputShowText>
			</InputContainerPass>
			{errorMessage && (
				<InputErrorFix className="input-error">
					<span>
						<VscError size={16} />
					</span>
					{errorMessage}
				</InputErrorFix>
			)}
		</InputGroup>
	);
};

export default InputPassword;
