import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import ButtonLg from './ButtonLg';
import { stripHtml } from '../utils/textUtils';
import { Container } from '../style/Container';

const Wrap = styled.div`
	padding: 40px 30px;
	background-color: var(--bg-white);
	border-radius: 30px;
	box-shadow: 0px 4px 16px 0px #2f7bf626;

	@media (max-width: 767px) {
		padding: 40px 20px;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;

	@media (max-width: 767px) {
		margin-bottom: 20px;
	}
`;

const Title = styled.h2`
	font-weight: 700;
	font-size: 28px;
	line-height: 33.6px;
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

const BtnEdit = styled.button`
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-decoration: underline;
	color: var(--color-accent);

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 16px;
		line-height: 16px;
	}

	@media (max-width: 767px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

const Text = styled.p`
	font-weight: 400;
	font-size: 18px;
	line-height: 28.8px;
	color: var(--color-black-change);
`;

const EditContainer = styled.div`
	position: relative;
	margin-top: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		margin-top: 0px;
	}
`;

const QuillBox = styled.div`
	margin-bottom: 30px;

	.ql-toolbar.ql-snow {
		border-top-left-radius: 10px !important;
		border-top-right-radius: 10px !important;
		background-color: var(--bg-info-board) !important;
	}

	.ql-container.ql-snow {
		height: 145px !important;
		border-bottom-left-radius: 10px !important;
		border-bottom-right-radius: 10px !important;
		color: var(--color-black-change) !important;
	}

	.ql-header.ql-picker {
		display: none;
	}

	.ql-formats.ql-clean {
		display: none;
	}
`;

const Error = styled.span`
	position: absolute;
	bottom: 63px;
	left: 0px;
	font-weight: 400;
	font-size: 12px;
	line-height: 16.8px;
	color: var(--color-red);

	@media (max-width: 767px) {
		bottom: 47px;
	}
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 12px;

	@media (max-width: 767px) {
		justify-content: center;
	}
`;

const AboutMe = ({
	aboutMe,
	tempAboutMe,
	setTempAboutMe,
	isEditingAbout,
	setIsEditingAbout,
	errors,
	publishAboutMe,
}) => {
	const editorRef = useRef(null);
	const quillRef = useRef(null);

	useEffect(() => {
		if (!isEditingAbout) return;

		const editorEl = editorRef.current;
		if (!editorEl) return;

		const quill = new Quill(editorEl, {
			theme: 'snow',
			placeholder: 'Write something about yourself…',
			modules: {
				toolbar: [
					['bold', 'italic', 'underline'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					['link'],
					['clean'],
				],
			},
		});

		quill.root.innerHTML = tempAboutMe || '';

		quill.on('text-change', () => {
			setTempAboutMe(quill.root.innerHTML);
		});

		quillRef.current = quill;

		return () => {
			editorEl.innerHTML = '';
			quillRef.current = null;
		};
	}, [isEditingAbout]);

	return (
		<Container>
			<Wrap>
				<Header>
					<Title>About Me</Title>
					<BtnEdit
						onClick={() => {
							setTempAboutMe(aboutMe);
							setIsEditingAbout(true);
						}}
					>
						Edit information
					</BtnEdit>
				</Header>

				{stripHtml(aboutMe).trim() ? (
					<Text dangerouslySetInnerHTML={{ __html: aboutMe }}></Text>
				) : (
					<Text>No information</Text>
				)}

				{isEditingAbout && (
					<EditContainer>
						<QuillBox>
							<div ref={editorRef} />
						</QuillBox>

						{errors.aboutMe && <Error>{errors.aboutMe}</Error>}

						<Actions>
							<ButtonLg
								onClick={() => publishAboutMe(tempAboutMe, setIsEditingAbout)}
								text={'Post'}
								style={{
									color: 'var(--color-white)',
									border: '1px solid var(--color-accent)',
									backgroundColor: 'var(--color-accent)',
								}}
							/>
							<ButtonLg
								onClick={() => setIsEditingAbout(false)}
								text={'Close'}
								style={{
									color: 'var(--color-accent)',
									border: '1px solid var(--color-accent)',
								}}
							/>
						</Actions>
					</EditContainer>
				)}
			</Wrap>
		</Container>
	);
};

export default AboutMe;
