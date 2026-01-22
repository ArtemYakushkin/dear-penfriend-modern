import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getCollectionData, deletePostCascade } from '../../api/dashboardService';

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
		width: 250px;
	}

	&:nth-child(3) {
		width: 20%;
	}

	&:nth-child(4) {
		width: 20%;
	}

	&:nth-child(5) {
		width: 20%;
	}

	&:nth-child(6) {
		border-radius: 0 10px 10px 0;
		width: 20%;
	}
`;

const PostsTable = () => {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const PAGE_SIZE = 5;

	useEffect(() => {
		getCollectionData('posts').then(setPosts);
	}, []);

	const filteredPosts = useMemo(() => {
		return posts.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()));
	}, [posts, search]);

	const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);

	const paginatedPosts = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filteredPosts.slice(start, start + PAGE_SIZE);
	}, [filteredPosts, page]);

	useEffect(() => {
		setPage(1);
	}, [search]);

	const handleDelete = async (postId) => {
		const ok = window.confirm('Delete post and ALL related comments and replies?');

		if (!ok) return;

		try {
			await deletePostCascade(postId);
			setPosts((prev) => prev.filter((p) => p.id !== postId));
		} catch (e) {
			console.error(e);
			toast.error('Error deleting post');
		}
	};

	return (
		<>
			<Options>
				<Count>
					Total posts: <span>{posts.length}</span>
				</Count>

				<Search style={{ width: '400px' }}>
					<label>
						<SearchInput
							type="text"
							placeholder="Search posts"
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
						<Th>Title</Th>
						<Th>Views</Th>
						<Th>Likes</Th>
						<Th>Comments</Th>
						<Th>Actions</Th>
					</Tr>
				</thead>
				<tbody>
					{paginatedPosts.map((p) => (
						<Tr key={p.id}>
							<Td>{p.author?.nickname}</Td>
							<Td>{p.title}</Td>
							<Td>{p.views || 0}</Td>
							<Td>{p.likes?.length || 0}</Td>
							<Td>{p.comments?.length || 0}</Td>
							<Td>
								<button onClick={() => handleDelete(p.id)}>
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

export default PostsTable;
