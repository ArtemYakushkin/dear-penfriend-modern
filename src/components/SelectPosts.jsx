import { useState, useRef, useEffect } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
	Select,
	SelectHeader,
	SelectTitle,
	SelectText,
	SelectArrow,
	SelectList,
	SelectItem,
} from '../style/SelectStyles';

const SelectPosts = ({ selectedOption, setSelectedOption }) => {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef(null);

	const options = ['New', 'Comment', 'Like'];

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

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

	return (
		<Select ref={dropdownRef}>
			<SelectHeader onClick={toggleDropdown}>
				<SelectTitle>Sort by:</SelectTitle>
				<SelectText>{selectedOption}</SelectText>
				<SelectArrow>
					{isOpen ? (
						<IoIosArrowUp size={24} />
					) : (
						<IoIosArrowDown size={24} />
					)}
				</SelectArrow>
			</SelectHeader>
			{isOpen && (
				<SelectList>
					{options.map((option) => (
						<SelectItem
							key={option}
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</SelectItem>
					))}
				</SelectList>
			)}
		</Select>
	);
};

export default SelectPosts;
