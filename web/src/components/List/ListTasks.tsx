import React, {
	useEffect,
} from 'react';
import {
	Checkbox,
	List,
	Message,
} from 'semantic-ui-react'
import { useObserver } from 'mobx-react-lite'

import NewTask from 'components/Task/NewTask'
import TaskView from 'components/Task/TaskView'

import { GetTasks } from 'api/GetTasksApi'

import { useStore } from 'stores/hooks'

import './List.css'

const ListTasks = () => {
	const tasksStore = useStore('tasksStore')
	const settingsStore = useStore('settingsStore')

	useEffect(()=>{
		if (!navigator.onLine) {
			settingsStore.setMessage('You\'re offline')
			return
		}
		GetTasks()
	}, [])

	return useObserver(() => (
		<>
			<Checkbox
				toggle
				defaultChecked={settingsStore.showFinished}
				label={<label>Show finished</label>}
				onChange={()=>{settingsStore.toggleShowFinished()}}
			/>
			<NewTask />
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
			) : <Message warning>{settingsStore.listMessage}</Message>}
		</>
	));
}

export default ListTasks;
