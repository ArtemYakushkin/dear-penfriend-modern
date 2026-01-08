import MessagesForm from './Messages/MessagesForm';
import MessagesList from './Messages/MessagesList';
import { Container } from '../style/Container';
import { Wrap, Header, Title, Text } from '../style/AboutMeStyles';

const AboutAuthor = ({ stripHtml, author, authorId }) => {
	return (
		<Container style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
			<Wrap>
				<Header>
					<Title>About author</Title>
				</Header>
				{stripHtml(author.aboutMe).trim() ? (
					<Text
						dangerouslySetInnerHTML={{
							__html: author.aboutMe,
						}}
					></Text>
				) : (
					<Text>{author.nickname} has not yet written anything about himself.</Text>
				)}
			</Wrap>

			<MessagesForm authorId={authorId} />
			<MessagesList authorId={authorId} showReplyForm={false} />
		</Container>
	);
};

export default AboutAuthor;
