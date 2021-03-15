import React, {
	useEffect,	useState
} from 'react';
import {
	Button,
	Dimmer,
	Divider,
	Header,
	Icon,
	List,
	Message,
} from 'semantic-ui-react'

import NotImplemented from 'components/Helpers/NotImplemented'
import { GetTasks } from 'api/TaskApi'

import ITasksList from 'interfaces/ITasksList'
import { ITask, ITaskInfo } from 'interfaces/ITask'

import './List.css'

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
				{info.list_items!==null?
					info.list_items.map((element, index)=>
					<List.Item key={index.toString()}>
						<List.Icon name="arrow right" />
						<List.Content>{element}</List.Content>
					</List.Item>
				) : <div></div>}
			</List>
			<Divider hidden />
		</>
	);
}

const DefaultTasks: ITask[] = [
	{
		name: 'No tasks',
		description: '',
		finished: false,
		info: {
			full_name: '',
			subject: '',
			list_items: [''],
		}
	}
]

const ListTasks: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>(DefaultTasks)
	const [isNoTasks, setNoTasks] = useState(true)
	const [open, setOpen] = useState(Array(tasks.length).fill(false))
	function toggleElement(index: number) {
		if(isNoTasks) return

		let copy = [...open]
		copy[index] = !open[index]
		setOpen([...copy])
	}

	useEffect(()=>{
		let new_tasks:ITask[]
		(async()=>{
			new_tasks = await GetTasks()
			setTasks(tasks => new_tasks)
			setNoTasks(false)
			setOpen(Array(new_tasks.length).fill(false))
		})();
	}, [])

	const [dimmerOpen, setDimmer] = useState(false)
	function toggleAddDimmer() {setDimmer(!dimmerOpen)}

	return (
		<>
			{tasks.length ?
			tasks.map((element, index) =>
				<List.Item key={index.toString()}>
					<Message
						color={element.finished === true?'green':'red'}
						className='cursor-pointer'
						onClick={()=>{toggleElement(index)}}
					>
						<Message.Header>{element.name}</Message.Header>
						<p>{element.description}</p>
					</Message>
					{open[index] && (<Task info={element.info}/>)}
				</List.Item>
			) : <p>No items</p>}
			<List.Item as="a" key="add">
				<Message info>
					<Message.Header onClick={toggleAddDimmer}>
						<Icon name="add" />
						Add task
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
