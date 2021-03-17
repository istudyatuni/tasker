import React, { useState } from 'react'
import {
	Button,
	Divider,
	Modal,
} from 'semantic-ui-react'

import { SendNewTask } from 'api/NewTaskApi'

import FormTask from './FormTask'

import { DefaultITask } from 'interfaces/ITask'

const NewTask: React.FC = () => {
	const [open, setOpen] = useState(false)

	async function handleResponse(status: boolean) {
		if(status) {
			setOpen(false)
		}
	}

	return (
		<>
			<Divider hidden />
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				trigger={
					<Button content='Add' icon='add' floated='right' color='violet' style={{marginTop: '-4.2em'}} />
				}
			>
				<Modal.Header>Create a task</Modal.Header>
				<Modal.Content scrolling>
					<FormTask
						handleResponse={handleResponse}
						apiFunction={SendNewTask}
						element={DefaultITask}
						is_new={true}
					/>
				</Modal.Content>
			</Modal>
		</>
	);
}

export default NewTask;
