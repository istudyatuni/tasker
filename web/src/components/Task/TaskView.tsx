import React, {
	useState
} from 'react';
import {
	Button,
	Container,
	Divider,
	Header,
	Icon,
	Modal,
} from 'semantic-ui-react'

import { FinishTask } from 'api/FinishTaskApi'
import { UpdateTask } from 'api/UpdateApi'

import FormTask from './FormTask'

import { ITask } from 'interfaces/ITask'

type TaskViewProps = {
	id: string|null;
	finished: boolean;
	element: ITask;
}

const TaskView: React.FC<TaskViewProps> = ({ id, finished, element }) => {
	const [open, setOpen] = useState(false)

	async function handleResponse(status: boolean) {
		if(status) {
			setOpen(false)
		}
	}

	const finishText = (stat: boolean): string =>
		stat ? 'Mark unfinished' : 'Finish'
	const [finishButton, setFinishButton] = useState(finishText(finished))

	async function toggleFinishButton() {
		FinishTask(id as string, !finished)
		setFinishButton(finishText(!finished))
		setTimeout(function(){window.location.reload()}, 10)
	}

	return (
		<>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				trigger={
					<Button
						icon
						floated='right'
						labelPosition='right'
					>
						Edit
						<Icon name='pencil' />
					</Button>
				}
			>
				<Modal.Header>Update a task</Modal.Header>
				<Modal.Content scrolling>
					<FormTask
						handleResponse={handleResponse}
						apiFunction={UpdateTask}
						element={element}
						is_new={false}
					/>
				</Modal.Content>
			</Modal>
			<Header>{element.info.full_name}</Header>
			<Header sub>{element.info.subject}</Header>
			<Divider />
			<Container>
				<Button
					color='teal'
					floated='right'
					content={finishButton}
					onClick={toggleFinishButton}
				/>
				{element.info.other_text.split(/\n/).map((e)=>
					<p style={{marginBottom: '0.4em'}}>{e}</p>
				)}
			</Container>
			<Divider hidden />
		</>
	);
}

export default TaskView;
