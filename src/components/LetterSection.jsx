import { useResponsive } from '../hooks/useResponsive';
import { useFirstPost } from '../hooks/useFirstPost';
import LetterDesk from './LetterDesk';
import LetterTablet from './LetterTablet';
import LetterMobile from './LetterMobile';

const LetterSection = () => {
	const { isMobile, isTablet } = useResponsive();
	const { handleFirstPostClick } = useFirstPost();

	return (
		<>
			{isMobile ? (
				<LetterMobile handleClick={handleFirstPostClick} />
			) : isTablet ? (
				<LetterTablet handleClick={handleFirstPostClick} />
			) : (
				<LetterDesk handleClick={handleFirstPostClick} />
			)}
		</>
	);
};

export default LetterSection;
