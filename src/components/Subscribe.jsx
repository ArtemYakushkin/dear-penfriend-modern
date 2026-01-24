import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUserFollowing, fetchUsersByIds } from '../api/fetchFollowUsers';
import { useAuthStore } from '../store/useAuthStore';

import InfoBoard from './InfoBoard';
import { Container } from '../style/Container';

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	gap: 24px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 20px;
	}

	@media (max-width: 767px) {
		gap: 16px;
	}
`;

const Item = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;

	@media (min-width: 768px) and (max-width: 1259px) {
		gap: 8px;
	}

	@media (max-width: 767px) {
		gap: 8px;
	}
`;

const Image = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	overflow: hidden;
	background-color: var(--bg-info-board);
	border: 8px solid var(--color-white);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (min-width: 768px) and (max-width: 1259px) {
		border: 4px solid var(--color-white);
	}

	@media (max-width: 767px) {
		border: 2px solid var(--color-white);
	}
`;

const Nickname = styled.span`
	font-weight: 400;
	font-size: 16px;
	line-height: 16px;
	color: var(--color-black-change);
	text-align: center;

	@media (min-width: 768px) and (max-width: 1259px) {
		font-size: 12px;
		line-height: 12px;
	}

	@media (max-width: 767px) {
		font-size: 8px;
		line-height: 8px;
	}
`;

const Subscribe = () => {
	const user = useAuthStore((state) => state.user);
	const [followingUsers, setFollowingUsers] = useState([]);

	useEffect(() => {
		const loadFollowing = async () => {
			const followingIds = await fetchUserFollowing(user.uid);
			const usersData = await fetchUsersByIds(followingIds);
			setFollowingUsers(usersData);
		};

		loadFollowing();
	}, [user.uid]);

	return (
		<Container>
			{followingUsers === 0 ? (
				<InfoBoard message={'You are not following anyone.'} />
			) : (
				<List>
					{followingUsers.map((u) => (
						<Link to={`/author/${u.id}`} key={u.id}>
							<Item>
								<Image>
									<img src={u.avatar} alt={u.nickname} width={40} />
								</Image>
								<Nickname>{u.nickname}</Nickname>
							</Item>
						</Link>
					))}
				</List>
			)}
		</Container>
	);
};

export default Subscribe;
