import React from 'react';
import { List, Container, Header } from 'semantic-ui-react'

import ListTasks from './ListTasks'

function ListContainer() {
	return (
		<>
			<Container text>
				<Header as='h2'>Tasks</Header>
				<List className="main-content">
					<ListTasks />
				</List>
			</Container>
		</>
	);
}

export default ListContainer;
