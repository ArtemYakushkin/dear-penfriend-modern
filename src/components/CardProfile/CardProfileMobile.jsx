import styled from 'styled-components';
import { Link } from 'react-router-dom';

import avatarPlaceholder from '../../assets/avatarFalce.png';
import coverPlaceholder from '../../assets/cover-img.png';
import facebook from '../../assets/SocialIcon/facebook.png';
import instagram from '../../assets/SocialIcon/instagram.png';
import telegram from '../../assets/SocialIcon/telegram.png';
import ButtonLg from '../Buttons/ButtonLg';
import { Container } from '../../style/Container';

import { FiSettings, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

const Info = styled.div`
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	background-color: var(--bg-author-info);
	border-radius: 0px;
	overflow: visible;
	padding-bottom: 30px;
	margin-bottom: 30px;
`;

const Avatar = styled.div`
	position: absolute;
	top: 162px;
	left: 24px;
	width: 176px;
	height: 176px;
	border-radius: 50%;
	overflow: hidden;
	background-color: var(--bg-info-board);
	border: 5px solid var(--color-white);
	box-shadow: 0px 4px 16px 0px #2f7bf626;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Settings = styled.div`
	position: absolute;
	top: 24px;
	right: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0px;
	padding: 10px 20px;
	border-radius: 5px;
	background-color: #eff2f9cc;
`;

const Cover = styled.img`
	width: 100%;
	height: 250px;
	max-height: 250px;
	object-fit: cover;
	margin-bottom: 22px;
`;

const Title = styled.h1`
	font-weight: 700;
	font-size: 40px;
	line-height: 46px;
	color: var(--color-black-change);
	margin-bottom: 10px;
`;

const Social = styled.div`
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
	margin-bottom: 38px;
`;

const Line = styled.div`
	padding: 0px;
	margin-bottom: 10px;

	div {
		width: 100%;
		height: 1px;
		background-color: var(--color-grey-light);
	}
`;

const Status = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
	margin-bottom: 20px;
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

const CardProfileMobile = ({
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
	showSubscribe,
	isFollowing,
	onSubscribe,
	onUnsubscribe,
}) => {
	return (
		<Info>
			<Avatar>
				<img src={avatar || avatarPlaceholder} alt={`${nickname}'s avatar`} />
			</Avatar>

			{showSettings && (
				<Settings>
					<button
						style={{
							width: '28px',
							height: '28px',
							color: 'var(--color-equivalent)',
						}}
						onClick={() => setIsModalSetting(true)}
					>
						<FiSettings size={28} />
					</button>
				</Settings>
			)}

			<Cover src={cover || coverPlaceholder} alt="Profile Cover" />

			<Container style={{ position: 'relative' }}>
				<Social>
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

				<Title>{nickname}</Title>

				<Line>
					<div></div>
				</Line>

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
					<>
						<ButtonLg
							text={'Edit profile information'}
							onClick={() => setIsModalEditProfile(true)}
							style={{
								color: 'var(--color-accent-change)',
								border: '1px solid var(--color-accent-change)',
								width: '329px',
								marginBottom: '20px',
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
										width: '329px',
									}}
								/>
							</Link>
						)}
					</>
				)}

				{showSubscribe && (
					<ButtonLg
						text={
							isFollowing ? (
								<>
									<FiMinusCircle size={20} />
									Unsubscribe
								</>
							) : (
								<>
									<FiPlusCircle size={20} />
									Subscribe
								</>
							)
						}
						onClick={isFollowing ? onUnsubscribe : onSubscribe}
						style={{
							backgroundColor: 'var(--color-accent)',
							color: 'var(--color-white)',
							border: '1px solid var(--color-accent)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '8px',
							width: '329px',
						}}
					/>
				)}
			</Container>
		</Info>
	);
};

export default CardProfileMobile;
