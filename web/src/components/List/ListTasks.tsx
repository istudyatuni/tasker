import React, {
	useEffect,	useState
} from 'react';
import {
	Button,
	Container,
	Dimmer,
	Divider,
	Header,
	Icon,
	List,
	Message,
} from 'semantic-ui-react'

import NotImplemented from 'components/Helpers/NotImplemented'
import NewTask from 'components/List/NewTask'
import ImportFile from 'components/List/ImportFile'

import { GetTasks } from 'api/TaskApi'
import { ExportTasks } from 'api/ExportApi'

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

const DefaultTasks: ITask[] = [
	{
		name: '',
		description: '',
		finished: false,
		info: {
			full_name: '',
			subject: '',
			other_text: '',
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
				<NewTask />
			</List.Item>
			<Button content='Export tasks' onClick={ExportTasks} />
			<ImportFile />
			<Divider hidden />
		</>
	);
}

export default ListTasks;
