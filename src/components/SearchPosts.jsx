import { useResponsive } from '../hooks/useResponsive';

import { Search, SearchInput, SearchIcon } from '../style/SearchStyles';

const SearchPosts = ({ value, onChange }) => {
	const { isTablet, isMobile } = useResponsive();

	return (
		<Search>
			<label>
				<SearchInput
					type="text"
					placeholder={isTablet || isMobile ? '' : 'Search posts'}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<SearchIcon size={24} />
			</label>
		</Search>
	);
};

export default SearchPosts;
