import { useState } from 'react';
import styled from 'styled-components';

import SelectPosts from '../SelectPosts';
import SearchPosts from '../SearchPosts';
import ViewToggle from '../ViewToggle';
import SwitcherTheme from '../SwitcherTheme';

import { Container } from '../../style/Container';

const Toolbar = styled.div`
	border-radius: 30px;
	backdrop-filter: blur(4px);
	box-shadow: 0px 4px 16px 0px #2f7bf626;
	display: flex;
	align-items: center;
	padding: 22px 38px;
	margin-bottom: 30px;
	scroll-margin-top: 30px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-bottom: 30px;
		padding: 16px 30px;
		border-radius: 50px;
	}

	@media (max-width: 767px) {
		scroll-margin-top: 100px;
		margin-bottom: 30px;
		padding: 16px 30px;
		border-radius: 50px;
	}
`;

const ToolbarMain = ({ onSearch, onSort, viewMode, setViewMode }) => {
	const [selectedOption, setSelectedOption] = useState('New');
	const [searchQuery, setSearchQuery] = useState('');
	const options = ['New', 'Comment', 'Like'];

	const handleSortChange = (option) => {
		setSelectedOption(option);
		onSort(option);
	};

	return (
		<Container>
			<Toolbar id="toolbar">
				<SelectPosts selectedOption={selectedOption} onChange={handleSortChange} options={options} />

				<SearchPosts
					value={searchQuery}
					onChange={(q) => {
						setSearchQuery(q);
						onSearch(q);
					}}
				/>

				<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

				<SwitcherTheme />
			</Toolbar>
		</Container>
	);
};

export default ToolbarMain;
