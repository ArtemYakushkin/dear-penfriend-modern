import { FaCheck } from 'react-icons/fa';

import {
	InputRemember,
	InputRememberCheckbox,
	InputRememberIcon,
} from '../style/InputStyles';

const InputCheck = ({ rememberMe, setRememberMe }) => {
	return (
		<>
			<InputRemember
				type="checkbox"
				id="rememberMe"
				checked={rememberMe}
				onChange={(e) => setRememberMe(e.target.checked)}
			/>
			<InputRememberCheckbox
				className="input-custom-checkbox"
				htmlFor="rememberMe"
			>
				<InputRememberIcon className="input-checkbox-icon">
					<FaCheck
						size={16}
						style={{ color: 'color: var(--color-white)' }}
					/>
				</InputRememberIcon>
				Remember me
			</InputRememberCheckbox>
		</>
	);
};

export default InputCheck;
