import { LuBookmark } from 'react-icons/lu';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LiaIdCardSolid } from 'react-icons/lia';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { PiUsersThree } from 'react-icons/pi';

import { useResponsive } from '../../hooks/useResponsive';
import { Container } from '../../style/Container';
import { Wrap, Btn } from '../../style/TabsStyles';

const TabsProfile = ({ activeTab, setActiveTab, postCount }) => {
	const { isMobile } = useResponsive();

	return (
		<Container>
			<Wrap>
				<Btn className={`${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
					<LiaIdCardSolid size={24} /> <p>About</p>
				</Btn>

				<Btn className={`${activeTab === 'message' ? 'active' : ''}`} onClick={() => setActiveTab('message')}>
					<BiMessageRoundedDots size={24} /> <p style={{ display: isMobile ? 'none' : '' }}>Messages</p>
				</Btn>

				{postCount === 0 ? (
					<></>
				) : (
					<Btn className={`${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
						<HiOutlineClipboardDocumentList size={24} />{' '}
						<p style={{ display: isMobile ? 'none' : '' }}>Posts ({postCount})</p>
					</Btn>
				)}

				<Btn className={`${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
					<LuBookmark size={24} /> <p style={{ display: isMobile ? 'none' : '' }}>Saved Posts</p>
				</Btn>

				<Btn
					className={`${activeTab === 'subscribe' ? 'active' : ''}`}
					onClick={() => setActiveTab('subscribe')}
				>
					<PiUsersThree size={24} /> <p style={{ display: isMobile ? 'none' : '' }}>Subscriptions</p>
				</Btn>
			</Wrap>
		</Container>
	);
};

export default TabsProfile;
