import styled from 'styled-components';

import { useResponsive } from '../hooks/useResponsive';

import { SlSocialFacebook } from 'react-icons/sl';
import { LiaTelegramPlane } from 'react-icons/lia';
import { CiLinkedin } from 'react-icons/ci';

import { Container } from '../style/Container';

const Share = styled.div`
	padding: 120px 0;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 90px 0;
	}

	@media (max-width: 767px) {
		padding: 90px 0;
	}
`;

const ShareWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 30px;
	}

	@media (max-width: 767px) {
		gap: 46px;
	}
`;

const ShareTitle = styled.h2`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
	text-align: center;
	max-width: 1004px;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 40px;
		line-height: 46px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const ShareSocial = styled.div`
	display: flex;
	gap: 20px;
	color: var(--color-black-change);
	font-weight: 700;
`;

const ShareText = styled.p`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);

	span {
		color: var(--color-accent);
		text-decoration: underline;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
		text-align: center;
	}

	@media (max-width: 767px) {
		font-size: 20px;
		line-height: 25px;
		text-align: center;
	}
`;

const ShareBlok = () => {
	const { isMobile } = useResponsive();

	const appUrl = encodeURIComponent(
		'https://dear-penfriend-5d0fd.firebaseapp.com/',
	);
	const shareLinks = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${appUrl}`,
		// instagram: "https://www.instagram.com/",
		telegram: `https://t.me/share/url?url=${appUrl}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${appUrl}`,
	};

	return (
		<Share>
			<Container>
				<ShareWrap>
					<div>
						{isMobile ? (
							<ShareTitle>
								Do you know someone who wants to chat with us{' '}
								<br /> on Dear Penfriend?
							</ShareTitle>
						) : (
							<ShareTitle>
								Do you know someone who wants to chat with us on
								Dear Penfriend?
							</ShareTitle>
						)}
						<ShareTitle>Share it with them!</ShareTitle>
					</div>
					<ShareSocial>
						{/* <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a> */}
						<a
							href={shareLinks.linkedin}
							target="_blank"
							rel="noopener noreferrer"
						>
							<CiLinkedin size={28} />
						</a>
						<a
							href={shareLinks.facebook}
							target="_blank"
							rel="noopener noreferrer"
						>
							<SlSocialFacebook size={24} />
						</a>
						<a
							href={shareLinks.telegram}
							target="_blank"
							rel="noopener noreferrer"
						>
							<LiaTelegramPlane size={24} />
						</a>
					</ShareSocial>
					{isMobile ? (
						<ShareText>
							You can use
							<br /> hashtag <span>#dear_penfriend</span> to share
							it on social media
						</ShareText>
					) : (
						<ShareText>
							You can use hashtag <span>#dear_penfriend</span> to
							share it on social media
						</ShareText>
					)}
				</ShareWrap>
			</Container>
		</Share>
	);
};

export default ShareBlok;
