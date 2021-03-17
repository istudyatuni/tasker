import React from 'react';
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	List,
} from 'semantic-ui-react'

import { ExportTasks } from 'api/ExportApi'

import ImportFile from 'components/List/ImportFile'
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
				<Grid columns={4}>
					<Grid.Row>
						<Grid.Column />
						<Grid.Column>
							<Button content='Export tasks' onClick={ExportTasks} />
						</Grid.Column>
						<Grid.Column>
							<ImportFile />
						</Grid.Column>
						<Grid.Column />
					</Grid.Row>
				</Grid>
				<Divider hidden style={{marginTop: '3em'}} />
			</Container>
		</>
	);
}

export default ListContainer;
