import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked) => {
	useEffect(() => {
		document.body.style.overflow = isLocked ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isLocked]);
};
