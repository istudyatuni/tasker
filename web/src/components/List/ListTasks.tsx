import React, {
	useEffect,	useState
} from 'react';
import {
	Button,
	Checkbox,
	Divider,
	List,
	Message,
} from 'semantic-ui-react'
import Cookies from 'js-cookie'

import NewTask from 'components/List/NewTask'
import ImportFile from 'components/List/ImportFile'
import TaskView from './TaskView'

import { GetTasks } from 'api/TaskApi'
import { ExportTasks } from 'api/ExportApi'

import { ITask } from 'interfaces/ITask'

import './List.css'

const ListTasks: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [isNoTasks, setNoTasks] = useState(true)
	const [open, setOpen] = useState(Array(tasks.length).fill(false))

	const [showFinished, setShowFinished] = useState((Cookies.get('show-finished') === 'true') || false)

	useEffect(()=>{
		Cookies.set('show-finished', showFinished.toString())
	}, [showFinished])

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
			<Checkbox
				toggle
				defaultChecked={showFinished}
				label={<label>Show finished</label>}
				onChange={()=>{setShowFinished(!showFinished)}}
			/>
			<Divider hidden />
			{tasks.length ?
			tasks.map((element, index) =>
				!showFinished && element.finished ?
				<div></div>
				: <List.Item key={index.toString()}>
					<Message
						color={element.finished === true?'green':'orange'}
						className='cursor-pointer'
						onClick={()=>{toggleElement(index)}}
					>
						<Message.Header>{element.name}</Message.Header>
						<p>{element.description}</p>
					</Message>
					{open[index] && (<TaskView info={element.info}/>)}
				</List.Item>
			) : <p>No tasks</p>}
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
