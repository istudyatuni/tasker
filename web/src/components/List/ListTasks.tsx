import React, {
	useEffect,
} from 'react';
import {
	Accordion,
	Checkbox,
	Label,
	List,
	Message,
} from 'semantic-ui-react'
import { Observer } from 'mobx-react-lite'

import NewTask from 'components/Task/NewTask'
import TaskView from 'components/Task/TaskView'

import { LoadTasks } from 'api/LoadTasksApi'

import { useStore } from 'stores/hooks'

import './List.css'

const ListTasks = () => {
	const tasksStore = useStore('tasksStore')
	const settingsStore = useStore('settingsStore')

	useEffect(()=>{
		if (!navigator.onLine) {
			settingsStore.setTasksListMessage('You\'re offline')
			return
		}
		LoadTasks()
	// eslint-disable-next-line
	}, [])

	return (
		<Observer>
		{() => (
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
				<></>
				: <List.Item key={index.toString()}>
					<Accordion styled fluid>
						<Accordion.Title onClick={()=>{tasksStore.toggleOpen(index)}} className='cursor-pointer'>
							<Message.Header>
								{element.name}
								{element.finished && (<Label color='green' content='Finished' size='mini' className='left-margin' />)}
							</Message.Header>
							<p>{element.description}</p>
						</Accordion.Title>
						<Accordion.Content active={tasksStore.opened[index]}>
							<TaskView id={element.task_id} finished={element.finished} element={element}/>
						</Accordion.Content>
					</Accordion>
				</List.Item>
			) : <Message warning>{settingsStore.tasksListMessage}</Message>}
		</>
		)}
		</Observer>
	);
}

export default ListTasks;
