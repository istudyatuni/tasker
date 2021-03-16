import React, {
	useEffect,	useState
} from 'react';
import {
	Button,
	Divider,
	List,
	Message,
} from 'semantic-ui-react'

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
					{open[index] && (<TaskView info={element.info}/>)}
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
