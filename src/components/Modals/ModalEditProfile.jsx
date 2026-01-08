import styled from 'styled-components';

import { useResponsive } from '../../hooks/useResponsive';
import { useEditProfile } from '../../hooks/useEditProfile';

import ButtonCloseModal from '../Buttons/ButtonCloseModal';
import InputText from '../Inputs/InputText';
import InputCountry from '../Inputs/InputCountry';
import InputProf from '../Inputs/InputProf';
import InputSocial from '../Inputs/InputSocial';
import ButtonLg from '../Buttons/ButtonLg';

import avatarPlaceholder from '../../assets/avatarFalce.png';
import coverPlaceholder from '../../assets/cover-img.png';
import Telegram from '../../assets/SocialIcon/telegram.png';
import Facebook from '../../assets/SocialIcon/facebook.png';
import Instagram from '../../assets/SocialIcon/instagram.png';
import { ModalOverlay, Modal, ModalScroll } from '../../style/ModalStyles';

const Block = styled.div`
	margin-bottom: 40px;

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 28px;
	line-height: 33.6px;
	color: var(--color-black-change);
	text-align: center;
`;

const SubTitle = styled.h2`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-grey-light);
	text-align: center;

	@media (max-width: 767px) {
		font-size: 14px;
		line-height: 20.8px;
	}
`;

const Description = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;

	@media (max-width: 767px) {
		margin-bottom: 10px;
	}
`;

const BlockTitle = styled.h4`
	font-weight: 700;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-black-change);
`;

const ChangeBlock = styled.div`
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-accent);
	text-decoration: underline;

	input {
		display: none;
	}

	label {
		cursor: pointer;
	}

	@media (max-width: 767px) {
		font-size: 13px;
		line-height: 13px;
	}
`;

const CoverImage = styled.div`
	background-image: url(${coverPlaceholder});
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 217px;
	border-radius: 30px;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 767px) {
		height: 167px;
		border-radius: 0px;
	}
`;

const MainBlock = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	margin-bottom: 40px;

	@media (max-width: 767px) {
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;
	}
`;

const AvatarImage = styled.div`
	width: 220px;
	height: 220px;
	border-radius: 50%;
	background-color: var(--bg-info-board);
	border: 8px solid var(--color-white);
	box-shadow: 0px 4px 16px 0px #2f7bf626;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const MainInfo = styled.div`
	width: 400px;

	@media (max-width: 767px) {
		width: 100%;
	}
`;

const PersonalInfo = styled.div`
	margin-bottom: 24px;

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const BtnBlock = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 10px;

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: center;
	}
`;

const ModalEditProfile = ({
	isOpen,
	onClose,
	user,
	setProfileState,
	nickname,
	country,
	profession,
	avatar,
	cover,
	facebookLink,
	instagramLink,
	telegramLink,
}) => {
	const { isMobile } = useResponsive();

	const {
		form,
		errors,
		showDropdown,
		setShowDropdown,
		dropdownHeaderRef,
		professions,
		countryHook,
		onChange,
		onTelegramChange,
		onAvatarChange,
		onCoverChange,
		onProfessionChange,
		onSave,
	} = useEditProfile({
		isOpen,
		user,
		initialData: {
			nickname,
			country,
			profession,
			avatar,
			cover,
			facebookLink,
			instagramLink,
			telegramLink,
		},
		onClose,
		setProfileState,
	});

	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<Modal className="editProfile">
				<ButtonCloseModal onClose={onClose} />

				<ModalScroll>
					<Block>
						<Title>Edit Profile</Title>
						<SubTitle>Manage your personal information to keep it accurate and up to date</SubTitle>
					</Block>

					<Block>
						<Description>
							<BlockTitle>Cover image</BlockTitle>
							<ChangeBlock>
								<input type="file" accept="image/*" onChange={onCoverChange} id="coverInput" />
								<label htmlFor="coverInput">Change</label>
							</ChangeBlock>
						</Description>
						<CoverImage>{form.cover && <img src={form.cover} alt="Profile Cover" />}</CoverImage>
					</Block>

					<MainBlock>
						<Block>
							<Description>
								<BlockTitle>Avatar</BlockTitle>
								<ChangeBlock>
									<input type="file" accept="image/*" onChange={onAvatarChange} id="avatarInput" />
									<label htmlFor="avatarInput">Change</label>
								</ChangeBlock>
							</Description>
							<AvatarImage>
								<img src={form.avatar || avatarPlaceholder} alt={`${form.nickname}'s avatar`} />
							</AvatarImage>
						</Block>

						<MainInfo>
							<PersonalInfo>
								<BlockTitle
									style={{
										marginBottom: isMobile ? '10px' : '16px',
									}}
								>
									Information
								</BlockTitle>
								<InputBox>
									<InputText
										value={form.nickname}
										onChange={onChange('nickname')}
										errorMessage={errors.nickname}
										placeholder={'Nickname'}
									/>

									<InputCountry
										value={form.country}
										handleCountryChange={countryHook.handleCountryChange}
										filteredCountries={countryHook.filteredCountries}
										showCountryDropdown={countryHook.showCountryDropdown}
										setShowCountryDropdown={countryHook.setShowCountryDropdown}
										setCountry={(v) =>
											onChange('country')({
												target: { value: v },
											})
										}
										errorMessage={errors.country}
										placeholder="Country"
									/>

									<InputProf
										selectedProfession={form.profession}
										showDropdown={showDropdown}
										errorMessage={errors.profession}
										professions={professions}
										onToggle={() => setShowDropdown((prev) => !prev)}
										onSelect={onProfessionChange}
										ref={dropdownHeaderRef}
									/>
								</InputBox>
							</PersonalInfo>

							<div>
								<BlockTitle
									style={{
										marginBottom: isMobile ? '10px' : '16px',
									}}
								>
									Contacts:
								</BlockTitle>
								<InputBox style={{ gap: '14px' }}>
									<InputSocial
										image={Telegram}
										title={'Telegram'}
										value={form.telegram}
										onChange={onTelegramChange}
										placeholder={'@Dear Penfriend'}
										errorMessage={errors.telegram}
									/>

									<InputSocial
										image={Instagram}
										title={'Instagram'}
										value={form.instagram}
										onChange={onChange('instagram')}
										placeholder={'https://www.instagram.com/a...'}
										errorMessage={errors.instagram}
									/>

									<InputSocial
										image={Facebook}
										title={'Facebook'}
										value={form.facebook}
										onChange={onChange('facebook')}
										placeholder={'https://www.facebook.com/an...'}
										errorMessage={errors.facebook}
									/>
								</InputBox>
							</div>
						</MainInfo>
					</MainBlock>

					<BtnBlock>
						<ButtonLg
							onClick={onClose}
							text={'Cancel changes'}
							style={{
								color: 'var(--color-accent)',
								border: '1px solid var(--color-accent)',
								width: isMobile ? '230px' : '',
							}}
						/>

						<ButtonLg
							onClick={onSave}
							text={'Save changes'}
							style={{
								color: 'var(--color-white)',
								border: '1px solid var(--color-accent)',
								backgroundColor: 'var(--color-accent)',
								width: isMobile ? '230px' : '',
							}}
						/>
					</BtnBlock>
				</ModalScroll>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalEditProfile;
