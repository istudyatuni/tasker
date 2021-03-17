import React, { useState } from 'react'
import {
	Icon,
	Message,
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
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={
				<Message info>
					<Message.Header>
						<Icon name="add" />
						Create task
					</Message.Header>
				</Message>
			}
		>
			<Modal.Header>Create a task</Modal.Header>
			<Modal.Content scrolling>
				<FormTask handleResponse={handleResponse} apiFunction={SendNewTask} element={DefaultITask} />
			</Modal.Content>
		</Modal>
	);
}

export default NewTask;
