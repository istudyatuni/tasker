import React, { useState } from 'react';
import {
	Button,
	Dimmer,
	Divider,
	Header,
	Icon,
	Label,
	List,
	Message,
	SemanticCOLORS,
} from 'semantic-ui-react'

import NotImplemented from 'components/Helpers/NotImplemented'

import './List.css'

const test_data = [
	{
		'name': 'Lab 1',
		'description': 'Networks',
		'color': 'red'
	},
	{
		'name': 'Lab 3',
		'description': 'Visual',
		'color': 'green'
	}
]

interface ITask {
	name: string;
	description: string;
	color: SemanticCOLORS;
	info: ITaskInfo;
}

interface ITaskInfo {
	full_name: string;
	subject: string;
	list_items: string[];
}

type TaskProps = {
	info: ITaskInfo;
}

const Task: React.FC<TaskProps> = ({ info }) => {
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
			<List>
				{info.list_items.map((element, index)=>
					<List.Item key={index.toString()}>
						<List.Icon name="arrow right" />
						<List.Content>{element}</List.Content>
					</List.Item>
				)}
			</List>
			<Divider hidden />
		</>
	);
}

const ListTasks: React.FC = () => {
	const [open, setOpen] = useState(Array(test_data.length).fill(false))
	function toggleElement(index: number) {
		let copy = [...open]
		copy[index] = !open[index]
		setOpen([...copy])
	}

	const [dimmerOpen, setDimmer] = useState(false)
	function toggleAddDimmer() {setDimmer(!dimmerOpen)}

	return (
		<>
			{test_data.map((element, index) =>
				<List.Item key={index.toString()}>
					<Message
						color={element.color as SemanticCOLORS}
						onClick={()=>{toggleElement(index)}}
						className='cursor-pointer'
					>
						<Message.Header>{element.name}</Message.Header>
						<p>{element.description}</p>
					</Message>
					{open[index] && (<Task info={element.info}/>)}
				</List.Item>
			)}
			<List.Item as="a" key="add">
				<Message info>
					<Message.Header onClick={toggleAddDimmer}>
						<Icon name="add" />
						Add element
					</Message.Header>
				</Message>
				<Dimmer active={dimmerOpen} onClickOutside={toggleAddDimmer} page>
					<NotImplemented />
				</Dimmer>
			</List.Item>
		</>
	);
}

export default ListTasks;
