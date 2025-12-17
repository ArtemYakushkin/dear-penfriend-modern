import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterStore } from '../store/useRegisterStore';

import ButtonCloseModal from './ButtonCloseModal';
import InputText from './InputText';
import InputCountry from './InputCountry';
import InputProf from './InputProf';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputFile from './InputFile';
import ButtonSubmit from './ButtonSubmit';
import Loader from './Loader';

import {
	Auth,
	AuthForm,
	AuthScroll,
	AuthTitle,
	AuthWrap,
	AuthBase,
	AuthSecondary,
	AuthUploadText,
	AuthUploadSubtext,
	AuthSuccess,
	AuthError,
	AuthLinkBox,
	AuthLinkText,
	AuthLinkTextAccent,
	AuthPrivacyText,
} from '../style/AuthStyles';

const Register = ({ onClose, isVisible, openLogin }) => {
	const store = useRegisterStore();

	useEffect(() => {
		if (store.successMessage) {
			const timer = setTimeout(() => {
				onClose();
				store.reset();
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [store.successMessage, onClose, store]);

	const handleClose = () => {
		store.reset();
		onClose();
	};

	return (
		<Auth $isVisible={isVisible}>
			{store.loading ? (
				<Loader />
			) : (
				<AuthForm
					$isVisible={isVisible}
					onSubmit={(e) => {
						e.preventDefault();
						store.submit(onClose);
					}}
				>
					<ButtonCloseModal onClose={handleClose} />

					<AuthScroll>
						<AuthTitle>Register</AuthTitle>

						<AuthWrap>
							<AuthBase>
								<InputText
									value={store.nickname}
									onChange={(e) =>
										store.setField(
											'nickname',
											e.target.value,
										)
									}
									errorMessage={store.errorMessage.nickname}
									placeholder={'Nickname'}
								/>

								<InputCountry
									placeholder={'Country'}
									value={store.country}
									handleCountryChange={(e) =>
										store.handleCountryChange(
											e.target.value,
										)
									}
									filteredCountries={store.filteredCountries}
									showCountryDropdown={
										store.showCountryDropdown
									}
									setShowCountryDropdown={
										store.setShowCountryDropdown
									}
									setCountry={(v) =>
										store.setField('country', v)
									}
									errorMessage={store.errorMessage.country}
								/>

								<InputProf
									selectedProfession={
										store.selectedProfession
									}
									showDropdown={store.showDropdown}
									professions={store.professions}
									onToggle={() =>
										store.setField(
											'showDropdown',
											!store.showDropdown,
										)
									}
									onSelect={store.selectProfession}
									errorMessage={store.errorMessage.profession}
								/>

								<InputEmail
									placeholder={'Email'}
									value={store.email}
									onChange={(e) =>
										store.setField('email', e.target.value)
									}
									errorMessage={store.errorMessage.email}
								/>

								<InputPassword
									placeholder={'Password (min. 6 characters)'}
									value={store.password}
									onChange={(e) =>
										store.setField(
											'password',
											e.target.value,
										)
									}
									showPassword={store.showPassword}
									togglePasswordVisibility={
										store.togglePassword
									}
									errorMessage={store.errorMessage.password}
								/>

								<InputPassword
									value={store.confirmPassword}
									onChange={(e) =>
										store.setField(
											'confirmPassword',
											e.target.value,
										)
									}
									showPassword={store.showPassword}
									togglePasswordVisibility={
										store.togglePassword
									}
									errorMessage={
										store.errorMessage.confirmPassword
									}
									placeholder={'Confirm password'}
								/>
							</AuthBase>

							<AuthSecondary>
								<InputFile
									imagePreview={store.imagePreview}
									handleImageChange={(e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										const reader = new FileReader();
										reader.onloadend = () =>
											store.setAvatar(
												file,
												reader.result,
											);
										reader.readAsDataURL(file);
									}}
								/>

								<AuthUploadText>Your avatar</AuthUploadText>
								<AuthUploadSubtext>*optional</AuthUploadSubtext>
							</AuthSecondary>
						</AuthWrap>

						{store.successMessage && (
							<AuthSuccess>{store.successMessage}</AuthSuccess>
						)}
						{store.error.general && (
							<AuthError>{store.error.general}</AuthError>
						)}

						<ButtonSubmit
							text="Register"
							style={{ marginBottom: '30px' }}
						/>

						<AuthLinkBox>
							<AuthLinkText>
								Already have an account?
							</AuthLinkText>
							<AuthLinkTextAccent onClick={openLogin}>
								Sign in
							</AuthLinkTextAccent>
						</AuthLinkBox>

						<AuthPrivacyText>
							By clicking register, I agree to{' '}
							<Link to="/privacy">Privacy Policy</Link>
						</AuthPrivacyText>
					</AuthScroll>
				</AuthForm>
			)}
		</Auth>
	);
};

export default Register;
