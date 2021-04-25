import React, {
	useState
} from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
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

import './Task.css'

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
			<Header className='task-header'>{element.info.full_name}</Header>
			<Header sub className='task-subheader'>{element.info.subject}</Header>
			<Divider />
			<Container className='task-text'>
				<Button
					color='teal'
					floated='right'
					content={finishButton}
					onClick={toggleFinishButton}
				/>
				<ReactMarkdown plugins={[gfm]} allowDangerousHtml={true}>{element.info.other_text}</ReactMarkdown>
			</Container>
		</>
	);
}

export default TaskView;
