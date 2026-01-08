import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import ButtonLg from './Buttons/ButtonLg';
import { stripHtml } from '../utils/textUtils';
import { Container } from '../style/Container';
import { Wrap, Header, Title, BtnEdit, Text, EditContainer, QuillBox, Error, Actions } from '../style/AboutMeStyles';

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
