import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { getCollectionData } from '../../api/dashboardService';

import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { Table, Tr, Td, Image, Options, Count, Pagination, Button } from '../../style/TableStyles';
import { Search, SearchInput, SearchIcon } from '../../style/SearchStyles';

const Th = styled.th`
	padding: 14px;
	font-size: 18px;
	color: var(--color-black-change);

	&:nth-child(1) {
		border-radius: 10px 0 0 10px;
		width: 80px;
	}

	&:nth-child(2) {
		width: 40%;
	}

	&:nth-child(3) {
		width: 40%;
	}

	&:nth-child(4) {
		border-radius: 0 10px 10px 0;
		width: 40%;
	}
`;

const UsersTable = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const PAGE_SIZE = 5;

	useEffect(() => {
		getCollectionData('users').then(setUsers);
	}, []);

	const filteredUsers = useMemo(() => {
		const q = search.toLowerCase();

		return users.filter((u) =>
			[u.nickname, u.country, u.profession].filter(Boolean).some((v) => v.toLowerCase().includes(q)),
		);
	}, [users, search]);

	const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

	const paginatedUsers = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filteredUsers.slice(start, start + PAGE_SIZE);
	}, [filteredUsers, page]);

	useEffect(() => {
		setPage(1);
	}, [search]);

	return (
		<>
			<Options>
				<Count>
					Total users: <span>{users.length}</span>
				</Count>

				<Search style={{ width: '400px' }}>
					<label>
						<SearchInput
							type="text"
							placeholder="Search users"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<SearchIcon size={24} />
					</label>
				</Search>

				<Pagination>
					<Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
						<MdOutlineArrowBackIos
							size={18}
							style={{
								color: 'var(--color-white)',
							}}
						/>
					</Button>

					<span>
						{page} / {totalPages}
					</span>

					<Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
						<MdOutlineArrowForwardIos
							size={18}
							style={{
								color: 'var(--color-white)',
							}}
						/>
					</Button>
				</Pagination>
			</Options>

			<Table>
				<thead>
					<Tr style={{ backgroundColor: 'var(--bg-auth-form)' }}>
						<Th>Photo</Th>
						<Th>Nickname</Th>
						<Th>Country</Th>
						<Th>Profession</Th>
					</Tr>
				</thead>
				<tbody>
					{paginatedUsers.map((u) => (
						<Tr key={u.id}>
							<Td>
								<Image src={u.avatar} alt="" />
							</Td>
							<Td>{u.nickname}</Td>
							<Td>{u.country}</Td>
							<Td>{u.profession}</Td>
						</Tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default UsersTable;
