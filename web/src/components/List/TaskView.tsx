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

import NotImplemented from 'components/Helpers/NotImplemented'

import { ITaskInfo } from 'interfaces/ITask'

type TaskViewProps = {
	info: ITaskInfo;
}

const TaskView: React.FC<TaskViewProps> = ({ info }) => {
	const [dimmerOpen, setDimmer] = useState(false)
	function toggleDimmer() {setDimmer(!dimmerOpen)}

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
				{info.other_text.split(/\n/).map((e)=>
					<div>{e}</div>
				)}
			</Container>
			<Divider hidden />
		</>
	);
}

export default TaskView;
