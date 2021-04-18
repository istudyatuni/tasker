import React, {
	useEffect,
	// useState,
} from 'react';
import {
	Button,
	Checkbox,
	List,
	Message,
} from 'semantic-ui-react'
// import Cookies from 'js-cookie'
import { useObserver } from 'mobx-react-lite'

import NewTask from 'components/Task/NewTask'
import TaskView from 'components/Task/TaskView'

import { GetTasks } from 'api/GetTasksApi'

// import { ITask } from 'interfaces/ITask'

import { useStore } from 'stores/hooks'

import './List.css'

const ListTasks = () => {
	const tasksStore = useStore('tasksStore')
	const settingsStore = useStore('settingsStore')

	// const [tasks, setTasks] = useState<ITask[]>(tasksStore.getAll())
	// const [errorMessage, setErrorMessage] = useState('No tasks')
	// const [open, setOpen] = useState(tasksStore.opened)

	// const [showFinished, setShowFinished] = useState((Cookies.get('show-finished') === 'true') || false)

	// useEffect(()=>{
	// 	Cookies.set('show-finished', showFinished.toString())
	// }, [showFinished])

	// function toggleElement(index: number) {
	// 	if(tasksStore.tasks.length === 0) return

	// 	let copy = [...open]
	// 	copy[index] = !open[index]
	// 	setOpen([...copy])
	// }

	useEffect(()=>{
		if (!navigator.onLine) {
			settingsStore.setMessage('You\'re offline')
			return
		}
		// let new_tasks:ITask[]
		// (async()=>{
			// let status:boolean
			/*status = await */GetTasks()

			// if (status) {
				// new_tasks = tasksStore.getAll()
				// setTasks(tasks => new_tasks)
			// 	setOpen(Array(tasksStore.tasks.length).fill(false))
			// } else {
			// 	setErrorMessage('Server unavailable')
			// }
		// })();
	}, [])

	function add_task() {
		tasksStore.add({
			task_id: '45',
			name: '646',
			description: 'description',
			finished: false,
			info: {
				full_name: 'name',
				subject: 'subject',
				other_text: 'text',
			},
		})
	}

	return useObserver(() => (
		<>
			<Checkbox
				toggle
				defaultChecked={settingsStore.showFinished}
				label={<label>Show finished</label>}
				onChange={()=>{settingsStore.toggleShowFinished()}}
			/>
			<Button onClick={add_task}>add task</Button>
			<NewTask />
			<p>{tasksStore.getAll.length}</p>
			{tasksStore.getAll.length ?
			tasksStore.getAll.map((element, index) =>
				!settingsStore.showFinished && element.finished ?
				<div></div>
				: <List.Item key={index.toString()}>
					<Message
						color={element.finished === true?'green':'orange'}
						className='cursor-pointer'
						onClick={()=>{tasksStore.toggleOpen(index)}}
					>
						<Message.Header>{element.name}</Message.Header>
						<p>{element.description}</p>
					</Message>
					{tasksStore.opened[index] && (<TaskView id={element.task_id} finished={element.finished} element={element}/>)}
				</List.Item>
			) : <p>{settingsStore.listMessage}</p>}
		</>
	));
}

export default ListTasks;
