import React, { useState } from 'react'
import {
	Button,
	Checkbox,
	Form,
	Icon,
	Message,
	Modal,
} from 'semantic-ui-react'

import { SendTask } from 'api/NewTaskApi'

import { ITask } from 'interfaces/ITask'

const FormTask: React.FC = () => {
	const [name, setName] = useState('')
	const [full_name, setFullName] = useState('')
	const [subject, setSubject] = useState('')
	const [description, setDescription] = useState('')
	const [finished, setFinished] = useState(false)

	function createTask() {
		let task_data: ITask = {
			name: name,
			description: description,
			finished: finished,
			info: {
				full_name: full_name,
				subject: subject,
				list_items: [],
			},
		}
		SendTask(task_data)
	}

	return (
		<Form onSubmit={createTask}>
			<Form.Group widths='equal'>
				<Form.Field>
					<label>Name</label>
					<Form.Input
						placeholder='JS ans CSS'
						onChange={(event: any, data: any)=>{setName(data.value)}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Full Name</label>
					<Form.Input
						placeholder='Работа №1'
						onChange={(event: any, data: any)=>{setFullName(data.value)}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Subject</label>
					<Form.Input
						placeholder='Информационные сети'
						onChange={(event: any, data: any)=>{setSubject(data.value)}}
					/>
				</Form.Field>
			</Form.Group>
				<Form.Field>
					<label>Description</label>
					<Form.Input
						placeholder='Лабораторное занятие 01.01.1970'
						onChange={(event: any, data: any)=>{setDescription(data.value)}}
					/>
				</Form.Field>
			<Form.Field>
				<Checkbox
					label='Finished'
					onChange={(event: any, data: any)=>{setFinished(data.checked)}}
				/>
			</Form.Field>
			<Button type='submit' floated='right' color='green'>Submit</Button>
		</Form>
	);
}

const NewTask: React.FC = () => {
	const [open, setOpen] = useState(false)

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
				<FormTask />
			</Modal.Content>
		</Modal>
	);
}

export default NewTask;
