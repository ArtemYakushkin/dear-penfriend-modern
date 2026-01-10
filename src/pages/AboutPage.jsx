import React, { useEffect } from 'react';

import Slider from '../components/SliderAbout/Slider';
import HowItWorks from '../components/HowItWorks';
import Team from '../components/Team/Team';
import LetterSection from '../components/LetterSection/LetterSection';
import ShareBlok from '../components/ShareBlok';

const AboutPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Slider />
			<HowItWorks />
			<Team />
			<LetterSection />
			<ShareBlok />
		</>
	);
};

export default AboutPage;
