import { useState, useRef, useEffect } from 'react';

export const useDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return {
		isOpen,
		setIsOpen,
		toggleDropdown,
		dropdownRef,
	};
};
