import styled from 'styled-components';
import { Link } from 'react-router-dom';

import avatarPlaceholder from '../../assets/avatarFalce.png';
import coverPlaceholder from '../../assets/cover-img.png';
import facebook from '../../assets/SocialIcon/facebook.png';
import instagram from '../../assets/SocialIcon/instagram.png';
import telegram from '../../assets/SocialIcon/telegram.png';
import ButtonLg from '../Buttons/ButtonLg';

import { FiSettings } from 'react-icons/fi';

const CardContainer = styled.div`
	max-width: 1440px;
	padding: 0 82px;
	margin: 0 auto;
`;

const Info = styled.div`
	position: relative;
	width: 100%;
	background-color: var(--bg-author-info);
	border-radius: 30px;
	overflow: hidden;
	padding-bottom: 30px;
	margin-bottom: 30px;
`;

const Avatar = styled.div`
	position: absolute;
	top: 189px;
	left: 38px;
	width: 282px;
	height: 282px;
	border-radius: 50%;
	overflow: hidden;
	background-color: var(--bg-info-board);
	border: 8px solid var(--color-white);
	box-shadow: 0px 4px 16px 0px #2f7bf626;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Cover = styled.img`
	width: 100%;
	height: 368px;
	object-fit: cover;
	margin-bottom: 46px;
`;

const PersonalInfo = styled.div`
	margin-left: 345px;
	margin-bottom: 26px;
	margin-right: 38px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h1`
	font-weight: 700;
	font-size: 48px;
	line-height: 57.6px;
	color: var(--color-black-change);
`;

const Social = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const SocialTitle = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-grey-light);
`;

const Line = styled.div`
	padding: 0 38px;
	margin-bottom: 30px;

	div {
		width: 100%;
		height: 1px;
		background-color: var(--color-grey-light);
	}
`;

const Options = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 38px;
`;

const Status = styled.ul`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const StatusItem = styled.li`
	padding: 4px 20px;
	border-radius: 20px;
	background-color: var(--bg-author-status);
`;

const StatusTitle = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-more);
`;

const StatusText = styled.span`
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);
`;

const Settings = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const CardProfileDesk = ({
	avatar,
	nickname,
	cover,
	facebookLink,
	instagramLink,
	telegramLink,
	country,
	profession,
	showSettings,
	setIsModalEditProfile,
	setIsModalSetting,
	isAllowed,
}) => {
	return (
		<CardContainer>
			<Info>
				<Avatar>
					<img src={avatar || avatarPlaceholder} alt={`${nickname}'s avatar`} />
				</Avatar>

				<Cover src={cover || coverPlaceholder} alt="Profile Cover" />

				<PersonalInfo>
					<Title>{nickname}</Title>
					<Social>
						{(facebookLink || instagramLink || telegramLink) && <SocialTitle>Contacts:</SocialTitle>}
						{facebookLink && (
							<a href={facebookLink} target="_blank" rel="noopener noreferrer">
								<img src={facebook} alt="facebook" />
							</a>
						)}
						{instagramLink && (
							<a href={instagramLink} target="_blank" rel="noopener noreferrer">
								<img src={instagram} alt="instagram" />
							</a>
						)}
						{telegramLink && (
							<a href={telegramLink} target="_blank" rel="noopener noreferrer">
								<img src={telegram} alt="telegram" />
							</a>
						)}
					</Social>
				</PersonalInfo>

				<Line>
					<div></div>
				</Line>

				<Options>
					<Status>
						<StatusItem>
							<StatusTitle>
								Country: <StatusText>{country}</StatusText>
							</StatusTitle>
						</StatusItem>
						<StatusItem>
							<StatusTitle>
								Status: <StatusText>{profession}</StatusText>
							</StatusTitle>
						</StatusItem>
					</Status>

					{showSettings && (
						<Settings>
							<ButtonLg
								text={'Edit profile information'}
								onClick={() => setIsModalEditProfile(true)}
								style={{
									color: 'var(--color-accent-change)',
									border: '1px solid var(--color-accent-change)',
								}}
							/>
							{isAllowed && (
								<Link to="/create">
									<ButtonLg
										text={'Create a post'}
										style={{
											backgroundColor: 'var(--color-accent)',
											color: 'var(--color-white)',
											border: '1px solid var(--color-accent)',
										}}
									/>
								</Link>
							)}
							<button onClick={() => setIsModalSetting(true)}>
								<FiSettings size={28} color="var(--color-black-change)" />
							</button>
						</Settings>
					)}
				</Options>
			</Info>
		</CardContainer>
	);
};

export default CardProfileDesk;
