import React, {
	useEffect,	useState
} from 'react';
import {
	Checkbox,
	List,
	Message,
} from 'semantic-ui-react'
import Cookies from 'js-cookie'

import NewTask from 'components/Task/NewTask'
import TaskView from 'components/Task/TaskView'

import { GetTasks } from 'api/GetTasksApi'

import { ITask } from 'interfaces/ITask'

import './List.css'

const ListTasks: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [isNoTasks, setNoTasks] = useState(true)
	const [errorMessage, setErrorMessage] = useState('No tasks')
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
		if (!navigator.onLine) {
			setErrorMessage('You\'re offline')
			return
		}
		let new_tasks:ITask[]
		(async()=>{
			let result:ITask[]|string
			result = await GetTasks()
			if (result instanceof Array && result.length > 0) {
				// it's definitly array, so we can do this
				new_tasks = result as ITask[]
				setTasks(tasks => new_tasks)
				setNoTasks(false)
				setOpen(Array(new_tasks.length).fill(false))
			} else {
				// it's not array, so it's a string
				setErrorMessage(result as string)
			}
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
			<NewTask />
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
					{open[index] && (<TaskView id={element.task_id} finished={element.finished} element={element}/>)}
				</List.Item>
			) : <p>{errorMessage}</p>}
		</>
	);
}

export default ListTasks;
