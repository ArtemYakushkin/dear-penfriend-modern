import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { VscError } from 'react-icons/vsc';

import DropdownProfession from '../Dropdowns/DropdownProfession';

import { InputGroup, InputContainer, InputError, InputDropHeader, InputDropArrow } from '../../style/InputStyles';

const InputProf = ({ selectedProfession, showDropdown, errorMessage, professions, onToggle, onSelect, ref }) => {
	return (
		<InputGroup>
			<InputContainer>
				<InputDropHeader
					ref={ref}
					className={`${errorMessage ? 'input-error' : ''} ${
						showDropdown || selectedProfession ? 'is-focused' : ''
					}`}
					tabIndex="0"
					onClick={onToggle}
				>
					<span className="input-dropdown-placeholder">Your status</span>

					<span className="input-dropdown-text">{selectedProfession || ''}</span>

					<InputDropArrow>
						{showDropdown ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
					</InputDropArrow>
				</InputDropHeader>

				{showDropdown && <DropdownProfession professions={professions} onSelect={onSelect} />}
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

export default InputProf;
