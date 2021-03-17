import React, {
	useState
} from 'react';
import {
	Button,
	Container,
	Dimmer,
	Divider,
	Header,
	Icon,
} from 'semantic-ui-react'

import { FinishTask } from 'api/FinishTaskApi'

import NotImplemented from 'components/Helpers/NotImplemented'

import { ITaskInfo } from 'interfaces/ITask'

type TaskViewProps = {
	id: string|null;
	info: ITaskInfo;
}

const TaskView: React.FC<TaskViewProps> = ({ id, info }) => {
	const [dimmerOpen, setDimmer] = useState(false)
	function toggleDimmer() {setDimmer(!dimmerOpen)}

	function markFinished() {
		FinishTask(id as string)
	}

	return (
		<>
			<Button
				icon
				floated='right'
				labelPosition='right'
				onClick={toggleDimmer}
			>
				Edit
				<Icon name='pencil' />
			</Button>
			<Dimmer active={dimmerOpen} onClickOutside={toggleDimmer} page>
				<NotImplemented />
			</Dimmer>
			<Header>{info['full_name']}</Header>
			<Header sub>{info['subject']}</Header>
			<Divider />
			<Container>
				<Button
					floated='right'
					content='Mark finished'
					onClick={markFinished}
				/>
				{info.other_text.split(/\n/).map((e)=>
					<p style={{marginBottom: '0.4em'}}>{e}</p>
				)}
			</Container>
			<Divider hidden />
		</>
	);
}

export default TaskView;
