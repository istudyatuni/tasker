import React from 'react';
import {
Container,
Divider,
Header,
List,
} from 'semantic-ui-react'

import ListTasks from './ListTasks'

function ListContainer() {
	return (
		<>
			<Container text>
				<Divider hidden />
				<Header as='h2'>Tasks</Header>
				<List>
					<ListTasks />
				</List>
			</Container>
		</>
	);
}

export default ListContainer;
