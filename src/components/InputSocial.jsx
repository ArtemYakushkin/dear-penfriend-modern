import {
	InputSocialWrap,
	InputSocialField,
	InputSocialError,
} from '../style/InputStyles';

const InputSocial = ({
	image,
	title,
	value,
	onChange,
	placeholder,
	errorMessage,
}) => {
	return (
		<InputSocialWrap>
			<img src={image} alt={title} />
			<p>{title}</p>
			<InputSocialField
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{errorMessage && (
				<InputSocialError>{errorMessage}</InputSocialError>
			)}
		</InputSocialWrap>
	);
};

export default InputSocial;
