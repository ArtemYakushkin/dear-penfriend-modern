import { useState } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '../store/useAuthStore';
import { useProfilePage } from '../hooks/useProfilePage';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import CardProfile from '../components/CardProfile';
import Tabs from '../components/Tabs';
import AboutMe from '../components/AboutMe';
import ModalEditProfile from '../components/ModalEditProfile';
import ModalUpdateCredentials from '../components/ModalUpdateCredentials';
import PopularPosts from '../components/PopularPosts';

const ProfileWrap = styled.div`
	padding-bottom: 120px;

	@media (min-width: 768px) and (max-width: 1259px) {
		padding-bottom: 90px;
	}

	@media (max-width: 767px) {
		margin-top: 81px;
		padding-bottom: 90px;
	}
`;

const ProfilePage = () => {
	const { user } = useAuthStore();
	const { state, setState, author, publishAboutMe } = useProfilePage(user);
	const allowedEmails = process.env.REACT_APP_ALLOWED_EMAILS?.split(',') || [];

	const isAllowed = author && allowedEmails.includes(author.email);

	const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'about');
	const [tempAboutMe, setTempAboutMe] = useState('');
	const [isEditingAbout, setIsEditingAbout] = useState(false);
	const [isModalEditProfile, setIsModalEditProfile] = useState(false);
	const [isModalSetting, setIsModalSetting] = useState(false);

	useBodyScrollLock(isModalEditProfile || isModalSetting);

	return (
		<>
			<ProfileWrap>
				<CardProfile
					avatar={state.avatar}
					cover={state.cover}
					nickname={state.nickname}
					country={state.country}
					profession={state.profession}
					facebookLink={state.facebook}
					instagramLink={state.instagram}
					telegramLink={state.telegram}
					showSettings={true}
					isAllowed={isAllowed}
					setIsModalEditProfile={setIsModalEditProfile}
					setIsModalSetting={setIsModalSetting}
				/>

				<Tabs activeTab={activeTab} setActiveTab={setActiveTab} postCount={state.postCount} />

				<>
					{activeTab === 'about' && (
						<AboutMe
							aboutMe={state.aboutMe}
							tempAboutMe={tempAboutMe}
							setTempAboutMe={setTempAboutMe}
							isEditingAbout={isEditingAbout}
							setIsEditingAbout={setIsEditingAbout}
							errors={state.errors}
							publishAboutMe={publishAboutMe}
						/>
					)}

					{activeTab === 'message' && (
						<div>Messages</div>
						// <div className="container">
						// 	{messages.length > 0 ? (
						// 		<MessagesList authorId={user.uid} showReplyForm={true} isOwnerPage={true} />
						// 	) : (
						// 		<InfoBoard message={'No messages.'} />
						// 	)}
						// </div>
					)}

					{/* {activeTab === 'posts' && <ProfilePosts />} */}

					{/* {activeTab === 'saved' && <SavedPosts />} */}
				</>

				{isModalEditProfile && (
					<ModalEditProfile
						nickname={state.nickname}
						country={state.country}
						profession={state.profession}
						avatar={state.avatar}
						cover={state.cover}
						user={user}
						setIsModalEditProfile={setIsModalEditProfile}
						facebookLink={state.facebook}
						instagramLink={state.instagram}
						telegramLink={state.telegram}
						isOpen={isModalEditProfile}
						onClose={() => setIsModalEditProfile(false)}
						setProfileState={setState}
					/>
				)}

				{isModalSetting && <ModalUpdateCredentials onClose={() => setIsModalSetting(false)} />}
			</ProfileWrap>

			<PopularPosts />
		</>
	);
};

export default ProfilePage;
