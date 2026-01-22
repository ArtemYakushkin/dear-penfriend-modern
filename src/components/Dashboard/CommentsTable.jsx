import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { getCollectionData, getUserById, getPostById, deleteCommentCascade } from '../../api/dashboardService';

import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';
import { Table, Tr, Td, Options, Count, Pagination, Button } from '../../style/TableStyles';
import { Search, SearchInput, SearchIcon } from '../../style/SearchStyles';

const Th = styled.th`
	padding: 14px;
	font-size: 18px;
	color: var(--color-black-change);

	&:nth-child(1) {
		border-radius: 10px 0 0 10px;
		width: 250px;
	}

	&:nth-child(2) {
		width: 40%;
	}

	&:nth-child(3) {
		width: 40%;
	}

	&:nth-child(4) {
		border-radius: 0 10px 10px 0;
		width: 20%;
	}
`;

const CommentsTable = () => {
	const [comments, setComments] = useState([]);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [loadingId, setLoadingId] = useState(null);
	const PAGE_SIZE = 5;

	useEffect(() => {
		const load = async () => {
			const raw = await getCollectionData('comments');

			const enriched = await Promise.all(
				raw.map(async (c) => {
					const [user, post] = await Promise.all([getUserById(c.author.id), getPostById(c.postId)]);

					return {
						...c,
						authorNickname: user?.nickname || '—',
						postTitle: post?.title || '—',
					};
				}),
			);

			setComments(enriched);
		};

		load();
	}, []);

	const filtered = useMemo(() => {
		return comments.filter((c) => c.text?.toLowerCase().includes(search.toLowerCase()));
	}, [comments, search]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

	const paginated = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filtered.slice(start, start + PAGE_SIZE);
	}, [filtered, page]);

	useEffect(() => {
		setPage(1);
	}, [search]);

	const handleDelete = async (id) => {
		if (!window.confirm('Delete comment and all replies?')) return;

		try {
			setLoadingId(id);
			await deleteCommentCascade(id);
			setComments((prev) => prev.filter((c) => c.id !== id));
		} catch (e) {
			console.error(e);
			alert('Delete failed');
		} finally {
			setLoadingId(null);
		}
	};

	return (
		<>
			<Options>
				<Count>
					Total comments: <span>{comments.length}</span>
				</Count>

				<Search style={{ width: '400px' }}>
					<label>
						<SearchInput
							type="text"
							placeholder="Search comments"
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
						<Th>Author</Th>
						<Th>Post</Th>
						<Th>Text</Th>
						<Th>Actions</Th>
					</Tr>
				</thead>
				<tbody>
					{paginated.map((c) => (
						<Tr key={c.id}>
							<Td>{c.authorNickname}</Td>
							<Td>{c.postTitle}</Td>
							<Td>{c.text.slice(0, 40)}...</Td>
							<Td>
								<button disabled={loadingId === c.id} onClick={() => handleDelete(c.id)}>
									<IoTrashOutline size={28} color="var(--color-red)" />
								</button>
							</Td>
						</Tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default CommentsTable;
