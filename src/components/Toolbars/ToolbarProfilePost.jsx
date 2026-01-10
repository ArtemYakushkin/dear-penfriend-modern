import styled from 'styled-components';

import SelectPosts from '../SelectPosts';
import SearchPosts from '../SearchPosts';
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

const ToolbarProfilePost = ({ searchQuery, setSearchQuery, onSearchChange, selectedOption, onSortChange, options }) => {
	return (
		<Container>
			<Toolbar>
				<SelectPosts selectedOption={selectedOption} onChange={onSortChange} options={options} />

				<SearchPosts
					value={searchQuery}
					onChange={(q) => {
						setSearchQuery(q);
						onSearchChange(q);
					}}
				/>

				<SwitcherTheme />
			</Toolbar>
		</Container>
	);
};

export default ToolbarProfilePost;
