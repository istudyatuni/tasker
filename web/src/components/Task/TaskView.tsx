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
	finished: boolean;
	info: ITaskInfo;
}

const TaskView: React.FC<TaskViewProps> = ({ id, finished, info }) => {
	const [dimmerOpen, setDimmer] = useState(false)
	function toggleDimmer() {setDimmer(!dimmerOpen)}

	const finishText = (stat: boolean): string =>
		stat ? 'Mark unfinished' : 'Finish'
	const [finishButton, setFinishButton] = useState(finishText(finished))

	async function toggleFinishButton() {
		FinishTask(id as string, !finished)
		setTimeout(function(){window.location.reload()}, 200)
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
					color='teal'
					floated='right'
					content={finishButton}
					onClick={toggleFinishButton}
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
