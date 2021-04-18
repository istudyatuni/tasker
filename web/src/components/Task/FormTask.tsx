import React, { useEffect, useState } from 'react'
import {
	Button,
	Checkbox,
	Divider,
	Form,
	Icon,
	Message,
	Popup,
	SemanticCOLORS,
	SemanticICONS,
	TextArea,
} from 'semantic-ui-react'

import { ITask } from 'interfaces/ITask'
import IResponse from 'interfaces/IResponse'

interface FormTaskProps {
	handleResponse: (arg0: boolean)=>void;
	// TYPE OF THIS FIELD IS IMPORTANT
	apiFunction: (arg0: ITask)=>Promise<IResponse>;
	element: ITask;
	is_new: boolean;
}

const FormTask: React.FC<FormTaskProps> = ({ handleResponse, apiFunction, element, is_new }) => {
	const [name, setName] = useState(element.name)
	const [full_name, setFullName] = useState(element.info.full_name)
	const [subject, setSubject] = useState(element.info.subject)
	const [description, setDescription] = useState(element.description)
	const [finished, setFinished] = useState(element.finished)
	// when you start editing, you need transform double line break back to \n
	// on server this store as one \n, but here (and in 'api/helpers/transformTasks.ts:TasksListElement2Task')
	// we make this transformation
	const [text, setText] = useState(element.info.other_text.replaceAll('\n\n', '\n'))

	useEffect(()=>{
		setMessageHidden(messageHidden => true)
	}, [name, full_name, subject, description, finished, text])

	// info message
	const [messageColor, setMessageColor] = useState('green')
	const [messageHidden, setMessageHidden] = useState(true)
	const [messageText, setMessageText] = useState('')

	async function handleSubmit() {
		let task_data: ITask = {
			task_id: element.task_id,
			name: name,
			description: description,
			finished: finished,
			info: {
				full_name: full_name,
				subject: subject,
				other_text: text,
			},
		}
		let result:IResponse = await apiFunction(task_data)
		setMessageText(result.message)
		setMessageHidden(false)
		setMessageColor(result.status?'green':'red')
		if(result.status) {
			setTimeout(function(){handleResponse(result.status)}, 300)
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group widths='equal'>
				<Form.Field required>
					<label>Name</label>
					<Form.Input
						placeholder='JS and CSS'
						defaultValue={name}
						onChange={(event: any, data: any)=>{setName(data.value)}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Full Name</label>
					<Form.Input
						placeholder='Самостоятельная работа №1'
						defaultValue={full_name}
						onChange={(event: any, data: any)=>{setFullName(data.value)}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Subject</label>
					<Form.Input
						placeholder='Информационные сети'
						defaultValue={subject}
						onChange={(event: any, data: any)=>{setSubject(data.value)}}
					/>
				</Form.Field>
			</Form.Group>
			<Form.Field>
				<label>Description</label>
				<Form.Input
					placeholder='Лабораторное занятие 01.01.1970'
					defaultValue={description}
					onChange={(event: any, data: any)=>{setDescription(data.value)}}
				/>
			</Form.Field>
			<Form.Field>
				<label>
					Text
					<span className='markdown-icon'>
						<Popup content='Styling with Markdown is supported' trigger={
							<Icon name={'markdown' as SemanticICONS} />
						} size='mini' basic position='right center'/>
					</span>
				</label>
				<TextArea
					rows={6}
					placeholder="Например, список названий лекций"
					defaultValue={text}
					onChange={(event: any, data: any)=>{setText(data.value)}}
				/>
			</Form.Field>
			{is_new ?
				<Form.Field>
					<Checkbox
						label='Finished'
						checked={finished}
						onChange={(event: any, data: any)=>{setFinished(data.checked)}}
					/>
				</Form.Field>
				: <span></span>
			}
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
