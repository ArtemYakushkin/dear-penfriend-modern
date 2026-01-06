import { useState } from 'react';
import countryList from 'react-select-country-list';

export const useCountrySelect = (setCountry) => {
	const countries = countryList().getData();

	const [filteredCountries, setFilteredCountries] = useState([]);
	const [showCountryDropdown, setShowCountryDropdown] = useState(false);

	const handleCountryChange = (e) => {
		const value = e.target.value;
		setCountry(value);

		if (!value.trim()) {
			setFilteredCountries([]);
			return;
		}

		setFilteredCountries(
			countries.filter((c) =>
				c.label.toLowerCase().startsWith(value.toLowerCase()),
			),
		);
	};

	return {
		filteredCountries,
		showCountryDropdown,
		setShowCountryDropdown,
		handleCountryChange,
	};
};
