import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LiaIdCardSolid } from 'react-icons/lia';

import { Container } from '../../style/Container';
import { Wrap, Btn } from '../../style/TabsStyles';

const TabsAuthor = ({ activeTab, setActiveTab, author }) => {
	return (
		<Container>
			<Wrap>
				<Btn className={`${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
					<LiaIdCardSolid size={24} /> About
				</Btn>

				{author.createdPosts.length === 0 ? (
					<></>
				) : (
					<Btn className={`${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
						<HiOutlineClipboardDocumentList size={24} /> Posts ({author.createdPosts.length})
					</Btn>
				)}
			</Wrap>
		</Container>
	);
};

export default TabsAuthor;
