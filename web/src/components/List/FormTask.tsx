import React, { useEffect, useState } from 'react'
import {
	Button,
	Checkbox,
	Divider,
	Form,
	Message,
	SemanticCOLORS,
	TextArea,
} from 'semantic-ui-react'

import { SendTask } from 'api/NewTaskApi'

import { ITask } from 'interfaces/ITask'
import IResponse from 'interfaces/IResponse'

type FormTaskProps = {
	handleResponse: (arg0: boolean)=>void
}

const FormTask: React.FC<FormTaskProps> = ({ handleResponse }) => {
	const [name, setName] = useState('')
	const [full_name, setFullName] = useState('')
	const [subject, setSubject] = useState('')
	const [description, setDescription] = useState('')
	const [finished, setFinished] = useState(false)
	const [text, setText] = useState('')

	useEffect(()=>{
		setMessageHidden(messageHidden => true)
	}, [name, full_name, subject, description, finished, text])

	// info message
	const [messageColor, setMessageColor] = useState('green')
	const [messageHidden, setMessageHidden] = useState(true)
	const [messageText, setMessageText] = useState('')

	async function createTask() {
		let task_data: ITask = {
			task_id: null,
			name: name,
			description: description,
			finished: finished,
			info: {
				full_name: full_name,
				subject: subject,
				other_text: text,
			},
		}
		let result:IResponse = await SendTask(task_data)
		setMessageText(result.message)
		setMessageHidden(false)
		setMessageColor(result.status?'green':'red')
		if(result.status) {
			setTimeout(function(){window.location.reload()}, 1000)
		}
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
						placeholder='Самостоятельная работа'
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
				<label>Text</label>
				<TextArea
					rows={3}
					placeholder="Например, список названий лекций"
					onChange={(event: any, data: any)=>{setText(data.value)}}
				/>
			</Form.Field>
			<Form.Field>
				<Checkbox
					label='Finished'
					onChange={(event: any, data: any)=>{setFinished(data.checked)}}
				/>
			</Form.Field>
			<Message
				hidden={messageHidden}
				color={messageColor as SemanticCOLORS}
				style={{textAlign: 'center'}}
			>{messageText}</Message>
			<Button type='submit' floated='right' color='green'>Submit</Button>
			<Divider hidden style={{marginBottom: '2.4em'}} />
		</Form>
	);
}

export default FormTask;
