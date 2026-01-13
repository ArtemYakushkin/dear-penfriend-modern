import { useEffect } from 'react';
import styled from 'styled-components';

import EnFlag from '../assets/Privacy/united-kingdom.png';
import UaFlag from '../assets/Privacy/ukraine.png';
import Security from '../assets/Privacy/encrypted.png';
import Hands from '../assets/Privacy/handshake.png';
import { Container } from '../style/Container';

const Wrap = styled.div`
	padding: 120px 0;
`;

const Inner = styled.div`
	margin-bottom: 48px;
`;

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-bottom: 24px;

	img {
		width: 40px;
		height: auto;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 40px;
		line-height: 46px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const SubTitle = styled.h5`
	font-weight: 700;
	font-size: 32px;
	line-height: 38.4px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 22px;
		line-height: 26.4px;
	}

	@media (max-width: 767px) {
		font-size: 22px;
		line-height: 26.4px;
	}
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-left: 32px;
	margin-bottom: 24px;
`;

const Item = styled.li`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: var(--color-black-change);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 20px;
		line-height: 25px;
	}
`;

const PrivacyPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Wrap>
			<Container>
				<Inner>
					<TitleBox>
						<img src={Security} alt="Security" />
						<Title>Privacy Policy / Політика конфіденційності</Title>
					</TitleBox>

					<TitleBox>
						<img src={EnFlag} alt="Uk" />
						<SubTitle>English</SubTitle>
					</TitleBox>
					<List>
						<Item>1. We care about your privacy.</Item>
						<Item>2. To use this platform, you only need to enter your country and nickname.</Item>
						<Item>
							3. Please don’t share personal data (your full name, phone number, or email) in posts or
							comments.
						</Item>
						<Item>4. We don’t collect, share or sell your personal data.</Item>
						<Item>5. If you want to delete your profile — just contact us.</Item>
					</List>

					<TitleBox>
						<img src={UaFlag} alt="Ua" />
						<SubTitle>Українська</SubTitle>
					</TitleBox>
					<List>
						<Item>1. Ми піклуємося про вашу конфіденційність.</Item>
						<Item>2. Щоб користуватись платформою, достатньо вказати країну та нікнейм.</Item>
						<Item>
							3. Будь ласка, не публікуйте особисту інформацію (повне ім’я, номер телефону, email) у
							постах або коментарях.
						</Item>
						<Item>4. Ми не збираємо, не передаємо і не продаємо ваші персональні дані.</Item>
						<Item>5. Якщо ви хочете видалити профіль — просто напишіть нам.</Item>
					</List>
				</Inner>

				<Inner style={{ marginBottom: '0px' }}>
					<TitleBox>
						<img src={Hands} alt="Hands" />
						<Title>Respect Code / Правила спілкування</Title>
					</TitleBox>

					<TitleBox>
						<img src={EnFlag} alt="Uk" />
						<SubTitle>English</SubTitle>
					</TitleBox>
					<List>
						<Item>1. Be kind. Be respectful.</Item>
						<Item>2. No bad words or hate speech.</Item>
						<Item>3. No phone numbers or emails in comments.</Item>
						<Item>4. Don’t pretend to be someone else.</Item>
						<Item>5. Let’s make this space friendly for everyone. </Item>
					</List>

					<TitleBox>
						<img src={UaFlag} alt="Ua" />
						<SubTitle>Українська</SubTitle>
					</TitleBox>
					<List>
						<Item>1. Будь доброзичливими. Поважайте інших.</Item>
						<Item>2. Без поганих слів і мови ненависті.</Item>
						<Item>3. Не публікуйте телефони чи email-адреси.</Item>
						<Item>4. Не видавайте себе за інших.</Item>
						<Item>5. Давайте зробимо це місце дружнім для всіх.</Item>
					</List>
				</Inner>
			</Container>
		</Wrap>
	);
};

export default PrivacyPage;
