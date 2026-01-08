import { useResponsive } from '../../hooks/useResponsive';

import CardProfileDesk from './CardProfileDesk';
import CardProfileTablet from './CardProfileTablet';
import CardProfileMobile from './CardProfileMobile';

const CardProfile = ({
	avatar,
	cover,
	nickname,
	country,
	profession,
	facebookLink,
	instagramLink,
	telegramLink,
	showSettings,
	isAllowed,
	setIsModalEditProfile,
	setIsModalSetting,
}) => {
	const { isMobile, isTablet } = useResponsive();

	return (
		<>
			{isMobile ? (
				<CardProfileMobile
					avatar={avatar}
					nickname={nickname}
					cover={cover}
					facebookLink={facebookLink}
					instagramLink={instagramLink}
					telegramLink={telegramLink}
					country={country}
					profession={profession}
					setIsModalEditProfile={setIsModalEditProfile}
					setIsModalSetting={setIsModalSetting}
					showSettings={showSettings}
					isAllowed={isAllowed}
				/>
			) : isTablet ? (
				<CardProfileTablet
					avatar={avatar}
					nickname={nickname}
					cover={cover}
					facebookLink={facebookLink}
					instagramLink={instagramLink}
					telegramLink={telegramLink}
					country={country}
					profession={profession}
					setIsModalEditProfile={setIsModalEditProfile}
					setIsModalSetting={setIsModalSetting}
					showSettings={showSettings}
					isAllowed={isAllowed}
				/>
			) : (
				<CardProfileDesk
					avatar={avatar}
					nickname={nickname}
					cover={cover}
					facebookLink={facebookLink}
					instagramLink={instagramLink}
					telegramLink={telegramLink}
					country={country}
					profession={profession}
					setIsModalEditProfile={setIsModalEditProfile}
					setIsModalSetting={setIsModalSetting}
					showSettings={showSettings}
					isAllowed={isAllowed}
				/>
			)}
		</>
	);
};

export default CardProfile;
