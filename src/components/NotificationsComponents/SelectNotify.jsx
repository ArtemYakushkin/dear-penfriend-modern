import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useRef, useState, useEffect } from 'react';

import { useResponsive } from '../../hooks/useResponsive';
import {
	Select,
	SelectHeader,
	SelectTitle,
	SelectText,
	SelectArrow,
	SelectList,
	SelectItem,
} from '../../style/SelectStyles';

const OPTIONS = ['All', 'New'];

const SelectNotify = ({ filter, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	const { isMobile } = useResponsive();

	useEffect(() => {
		const handler = (e) => ref.current && !ref.current.contains(e.target) && setIsOpen(false);
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const selected = filter === 'all' ? 'All' : 'New';

	return (
		<Select ref={ref} style={{ width: isMobile ? '120px' : '195px', display: 'flex', justifyContent: 'end' }}>
			<SelectHeader onClick={() => setIsOpen((p) => !p)}>
				<SelectTitle>Show:</SelectTitle>
				<SelectText>{selected}</SelectText>
				<SelectArrow> {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</SelectArrow>
			</SelectHeader>

			{isOpen && (
				<SelectList style={{ top: isMobile ? '30px' : '35px', left: isMobile ? '0px' : '40px' }}>
					{OPTIONS.map((opt) => (
						<SelectItem
							key={opt}
							onClick={() => {
								onChange(opt === 'All' ? 'all' : 'unread');
								setIsOpen(false);
							}}
						>
							{opt}
						</SelectItem>
					))}
				</SelectList>
			)}
		</Select>
	);
};

export default SelectNotify;
