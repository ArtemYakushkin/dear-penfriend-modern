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
	showSubscribe,
	isFollowing,
	onSubscribe,
	onUnsubscribe,
	loadingFollow,
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
					showSubscribe={showSubscribe}
					isFollowing={isFollowing}
					onSubscribe={onSubscribe}
					onUnsubscribe={onUnsubscribe}
					loadingFollow={loadingFollow}
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
					showSubscribe={showSubscribe}
					isFollowing={isFollowing}
					onSubscribe={onSubscribe}
					onUnsubscribe={onUnsubscribe}
					loadingFollow={loadingFollow}
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
					showSubscribe={showSubscribe}
					isFollowing={isFollowing}
					onSubscribe={onSubscribe}
					onUnsubscribe={onUnsubscribe}
					loadingFollow={loadingFollow}
				/>
			)}
		</>
	);
};

export default CardProfile;
