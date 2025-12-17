import { List, Item } from '../style/DropStyles';

const DropdownProfession = ({ professions, onSelect }) => {
	return (
		<List>
			{professions.map((profession) => (
				<Item key={profession} onClick={() => onSelect(profession)}>
					{profession}
				</Item>
			))}
		</List>
	);
};

export default DropdownProfession;
