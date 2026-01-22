import { Container } from '../../style/Container';
import { Wrap, Btn } from '../../style/TabsStyles';

const Sidebar = ({ setActive, activeTab }) => {
	const items = [
		{ id: 'users', label: 'Users' },
		{ id: 'posts', label: 'Posts' },
		{ id: 'comments', label: 'Comments' },
	];

	return (
		<Container>
			<Wrap>
				{items.map((item) => (
					<Btn
						className={`${activeTab === item.id ? 'active' : ''}`}
						onClick={() => setActive(item.id)}
						key={item.id}
					>
						{item.label}
					</Btn>
				))}
			</Wrap>
		</Container>
	);
};

export default Sidebar;
