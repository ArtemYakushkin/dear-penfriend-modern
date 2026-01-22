import { useState } from 'react';
import styled from 'styled-components';

import Sidebar from '../components/Dashboard/Sidebar';
import UsersTable from '../components/Dashboard/UsersTable';
import PostsTable from '../components/Dashboard/PostsTable';
import CommentsTable from '../components/Dashboard/CommentsTable';
import { Container } from '../style/Container';

const Wrap = styled.div`
	padding: 0px 0 90px 0;
	min-height: 100vh;
`;

const DashboardPage = () => {
	const [activeTab, setActiveTab] = useState('users');

	const renderContent = () => {
		switch (activeTab) {
			case 'users':
				return <UsersTable />;
			case 'posts':
				return <PostsTable />;
			case 'comments':
				return <CommentsTable />;
			default:
				return null;
		}
	};

	return (
		<Wrap>
			<Sidebar activeTab={activeTab} setActive={setActiveTab} />
			<Container>
				<div>{renderContent()}</div>
			</Container>
		</Wrap>
	);
};

export default DashboardPage;
