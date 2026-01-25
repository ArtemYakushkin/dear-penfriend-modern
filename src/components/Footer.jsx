import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GoDotFill } from 'react-icons/go';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import LogoBrand from './LogoBrand';
import ModalHelp from './Modals/ModalHelp';
import { Container } from '../style/Container';

const FooterTop = styled.div`
	padding: 40px 0;
	background-color: var(--color-dark-blue);

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 20px 0;
	}
`;

const FooterTopWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}
`;

const FooterTopNav = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 56px;

	@media (max-width: 767px) {
		width: 100%;
		justify-content: space-between;
	}
`;

const FooterTopLink = styled(Link)`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-white);
`;

const FooterTopSocial = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const FooterHelp = styled.button`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-white);
`;

const FooterPrivacy = styled(Link)`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-white);
`;

const FooterCenter = styled.div`
	padding: 38px 0;
	border-bottom: 1px solid var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		padding: 29px 0px 21px 0px;
	}

	@media (max-width: 767px) {
		padding: 39px 0px 30px 0px;
	}
`;

const FooterCenterWrap = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 767px) {
		flex-direction: column;
		gap: 18px;
	}
`;

const FooterCenterTitle = styled.h4`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);
	margin-right: 18px;

	@media (min-width: 768px) and (max-width: 1259px) {
		max-width: 131px;
		margin-right: 45px;
	}

	@media (max-width: 767px) {
		margin-right: 0px;
	}
`;

const FooterCenterText = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 16px;
	}

	@media (max-width: 767px) {
		flex-direction: column;
		gap: 4px;
	}
`;

const FooterCenterBlokText = styled.div`
	display: flex;
	align-items: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		align-items: baseline;
	}
`;

const FooterCenterAuthor = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-left: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
	}
`;

const FooterAuthorJob = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-black-change);
`;

const FooterAuthorName = styled.a`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-black-change);
	text-decoration: underline;
`;

const FooterBottom = styled.div`
	padding: 25px 0;

	@media (max-width: 767px) {
		padding: 30px 0;
	}
`;

const FooterCopyright = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 16.8px;
	color: var(--color-black-change);

	@media (max-width: 767px) {
		text-align: center;
	}
`;

const Footer = () => {
	const [isOpen, setIsOpen] = useState(false);
	useBodyScrollLock(isOpen);

	return (
		<div className="footer">
			<FooterTop>
				<Container>
					<FooterTopWrap>
						<FooterTopNav>
							<LogoBrand style={{ color: 'var(--color-white)' }} />
							<FooterTopLink to={'/about'}>About project</FooterTopLink>
						</FooterTopNav>

						<FooterTopSocial>
							<FooterHelp onClick={() => setIsOpen(true)}>Help</FooterHelp>
							<FooterPrivacy to={'/privacy'}>Privacy Policy</FooterPrivacy>
						</FooterTopSocial>
					</FooterTopWrap>
				</Container>
			</FooterTop>

			<FooterCenter>
				<Container>
					<FooterCenterWrap>
						<FooterCenterTitle>The project was made by:</FooterCenterTitle>
						<FooterCenterText>
							<FooterCenterBlokText>
								<GoDotFill
									size={10}
									style={{
										color: 'var(--color-black-change)',
									}}
								/>
								<FooterCenterAuthor>
									<FooterAuthorJob>Project author</FooterAuthorJob>
									<FooterAuthorName
										href="https://a-teacher.netlify.app/"
										target="_blank"
										rel="noreferrer"
									>
										Anna Yakushkina
									</FooterAuthorName>
								</FooterCenterAuthor>
							</FooterCenterBlokText>

							<FooterCenterBlokText>
								<GoDotFill
									size={10}
									style={{
										color: 'var(--color-black-change)',
									}}
								/>
								<FooterCenterAuthor>
									<FooterAuthorJob>Site developer</FooterAuthorJob>
									<FooterAuthorName
										href="https://artem-yakushkin.netlify.app"
										target="_blank"
										rel="noreferrer"
									>
										Artem Yakushkin
									</FooterAuthorName>
								</FooterCenterAuthor>
							</FooterCenterBlokText>

							<FooterCenterBlokText>
								<GoDotFill
									size={10}
									style={{
										color: 'var(--color-black-change)',
									}}
								/>
								<FooterCenterAuthor>
									<FooterAuthorJob>Website designer</FooterAuthorJob>
									<FooterAuthorName
										href="https://anastasiiahorbatenko.weblium.site/"
										target="_blank"
										rel="noreferrer"
									>
										Anastasia Horbatenko
									</FooterAuthorName>
								</FooterCenterAuthor>
							</FooterCenterBlokText>
						</FooterCenterText>
					</FooterCenterWrap>
				</Container>
			</FooterCenter>

			<FooterBottom>
				<Container>
					<FooterCopyright>Dear Penfriend © 2024. All rights reserved</FooterCopyright>
				</Container>
			</FooterBottom>

			{isOpen && <ModalHelp onClose={() => setIsOpen(false)} />}
		</div>
	);
};

export default Footer;
