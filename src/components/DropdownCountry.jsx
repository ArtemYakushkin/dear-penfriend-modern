import { List, Item } from '../style/DropStyles';

const DropdownCountry = ({ items = [], onSelect }) => {
	if (!items || items.length === 0) return null;

	return (
		<List>
			{items.map((c) => (
				<Item key={c.value} onClick={() => onSelect && onSelect(c)}>
					{c.label}
				</Item>
			))}
		</List>
	);
};

export default DropdownCountry;
