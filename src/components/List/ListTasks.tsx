import React, { useState } from 'react';
import {
	Dimmer,
	Icon,
	Label,
	List,
	Header,
	Message,
	SemanticCOLORS,
} from 'semantic-ui-react'

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

function Task() {
	return (
		<>
			<Icon name="pencil" />
		</>
	);
}

function ListTasks() {
	const [open, setOpen] = useState(Array(test_data.length).fill(false))
	function toggleElement(index: number) {
		let copy = [...open]
		copy[index] = !open[index]
		setOpen([...copy])
	}

	const [dimmerOpen, setDimmer] = useState(false)
	function openAddDimmer() {setDimmer(true)}
	function closeAddDimmer() {setDimmer(false)}

	return (
		<>
			{test_data.map((element, index) =>
				<List.Item
					as="a"
					key={index.toString()}
				>
					<Message
						color={element.color as SemanticCOLORS}
						onClick={()=>{toggleElement(index)}}
					>
						<Message.Header>{element.name}</Message.Header>
						<p>{element.description}</p>
					</Message>
						{open[index] && (<Task/>)}
				</List.Item>
			)}
			<List.Item as="a" key="add">
				<Message color="blue">
					<Message.Header onClick={openAddDimmer}>
						<Icon name="add" />
						Add element
					</Message.Header>
				</Message>
				<Dimmer active={dimmerOpen} onClickOutside={closeAddDimmer} page>
					<Header as='h2' icon inverted>
						<Icon name='wait' />
						Now not implemented
					</Header>
				</Dimmer>
			</List.Item>
		</>
	);
}

export default ListTasks;
