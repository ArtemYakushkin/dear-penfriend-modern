import { VscError } from 'react-icons/vsc';

import DropdownCountry from './DropdownCountry';

import {
	InputGroup,
	InputContainer,
	InputMain,
	InputPlaceholder,
	InputError,
} from '../style/InputStyles';

const InputCountry = ({
	value,
	handleCountryChange,
	filteredCountries,
	showCountryDropdown,
	setShowCountryDropdown,
	setCountry,
	errorMessage,
	placeholder,
}) => {
	const handleSelect = (c) => {
		setCountry(c.label);
		setShowCountryDropdown(false);
	};

	return (
		<InputGroup>
			<InputContainer>
				<InputMain
					className={`${errorMessage ? 'input-error' : ''}`}
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={handleCountryChange}
					onFocus={() => setShowCountryDropdown(true)}
					onBlur={() =>
						setTimeout(() => setShowCountryDropdown(false), 200)
					}
				/>
				<InputPlaceholder className="input-placeholder">
					{placeholder}
				</InputPlaceholder>

				{showCountryDropdown && filteredCountries.length > 0 && (
					<DropdownCountry
						items={filteredCountries}
						onSelect={handleSelect}
					/>
				)}
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

export default InputCountry;
