import { useEffect } from 'react';

import ButtonCloseModal from './ButtonCloseModal';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputCheck from './InputCheck';
import ButtonSubmit from './ButtonSubmit';
import Loader from './Loader';

import { useLoginStore } from '../store/useLoginStore';
import { useResponsive } from '../hooks/useResponsive';

import {
	Auth,
	AuthForm,
	AuthTitle,
	AuthBase,
	AuthRemember,
	AuthForgot,
	AuthRecoverList,
	AuthRecoverItem,
	AuthSuccess,
	AuthError,
	AuthLinkBox,
	AuthLinkText,
	AuthLinkTextAccent,
} from '../style/AuthStyles';

const Login = ({ isVisible, onClose, openRegister, onCloseUnreg }) => {
	const store = useLoginStore();
	const loadRemembered = useLoginStore((s) => s.loadRemembered);
	const { isMobile } = useResponsive();

	useEffect(() => {
		loadRemembered();
	}, [loadRemembered]);

	const handleClose = () => {
		store.reset();
		onClose();
	};

	return (
		<Auth $isVisible={isVisible}>
			{store.loading ? (
				<Loader />
			) : store.view === 'login' ? (
				<AuthForm
					$isVisible={isVisible}
					style={{
						width: '482px',
						paddingRight: isMobile ? '24px' : '40px',
					}}
					onSubmit={(e) => {
						e.preventDefault();
						store.submitLogin({ onClose, onCloseUnreg });
					}}
				>
					<ButtonCloseModal onClose={handleClose} />
					<AuthTitle>Sign in</AuthTitle>
					<AuthBase style={{ width: '100%', marginBottom: '30px' }}>
						<InputEmail
							value={store.email}
							onChange={(e) =>
								store.setField('email', e.target.value)
							}
							errorMessage={store.errorMessage.email}
							placeholder={'Email'}
						/>

						<InputPassword
							value={store.password}
							onChange={(e) =>
								store.setField('password', e.target.value)
							}
							showPassword={store.showPassword}
							togglePasswordVisibility={store.togglePassword}
							errorMessage={store.errorMessage.password}
							placeholder={'Password'}
						/>
					</AuthBase>
					<AuthRemember>
						<InputCheck
							rememberMe={store.rememberMe}
							setRememberMe={(v) =>
								store.setField('rememberMe', v)
							}
						/>
						<AuthForgot onClick={() => store.setView('reset')}>
							Forgot your password?
						</AuthForgot>
					</AuthRemember>
					{store.successMessage && (
						<AuthSuccess>{store.successMessage}</AuthSuccess>
					)}
					{store.error && <AuthError>{store.error}</AuthError>}
					<ButtonSubmit
						text="Sign in"
						style={{ marginBottom: '30px' }}
					/>
					<AuthLinkBox>
						<AuthLinkText>Don't have an account?</AuthLinkText>
						<AuthLinkTextAccent onClick={openRegister}>
							Register
						</AuthLinkTextAccent>
					</AuthLinkBox>{' '}
				</AuthForm>
			) : store.view === 'reset' ? (
				<AuthForm
					$isVisible={isVisible}
					style={{
						width: '482px',
						paddingRight: isMobile ? '24px' : '40px',
					}}
					onSubmit={(e) => {
						e.preventDefault();
						store.submitLogin({ onClose, onCloseUnreg });
					}}
				>
					<AuthTitle>Reset password</AuthTitle>
					<AuthBase style={{ width: '100%', marginBottom: '30px' }}>
						<InputEmail
							value={store.email}
							onChange={(e) =>
								store.setField('email', e.target.value)
							}
							errorMessage={store.errorMessage.email}
							placeholder={'Enter your email'}
						/>
					</AuthBase>
					<ButtonSubmit
						text="Send reset email"
						onClick={store.resetPassword}
					/>
				</AuthForm>
			) : (
				<AuthForm
					$isVisible={isVisible}
					style={{
						width: '482px',
						paddingRight: isMobile ? '24px' : '40px',
					}}
					onSubmit={(e) => {
						e.preventDefault();
						store.submitLogin({ onClose, onCloseUnreg });
					}}
				>
					<AuthTitle>Password recovery instructions</AuthTitle>
					<AuthRecoverList>
						<AuthRecoverItem>
							1. A link to reset your password has been sent to
							your email.
						</AuthRecoverItem>
						<AuthRecoverItem>
							2. Follow this link and enter a new password.
						</AuthRecoverItem>
						<AuthRecoverItem>
							3. Reopen the window to log into your account and
							enter a new password.
						</AuthRecoverItem>
						<AuthRecoverItem>
							4. Voila. You are back with us.
						</AuthRecoverItem>
						<AuthRecoverItem>
							5. If you can't find the email in your inbox, please
							check your spam folder.
						</AuthRecoverItem>
					</AuthRecoverList>
					<ButtonSubmit
						text={'Close'}
						onClick={handleClose}
						style={{ marginBottom: '0px' }}
					/>
				</AuthForm>
			)}
		</Auth>
	);
};

export default Login;
