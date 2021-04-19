import ITasksList from 'interfaces/ITasksList'

import { TasksListArray2Task } from 'api/helpers/transformTasks'

import { stores } from 'stores/stores'

export const LoadTasks = async () => {
	let settingsStore = stores.settingsStore

	try	{
		let tasksStore = stores.tasksStore

		const response = await fetch('/api/tasks', {
			method: 'GET'
		})

		if(response.ok) {
			let resp = await response.json() as ITasksList[];
			if(resp.length) {
				tasksStore.setAll(TasksListArray2Task(resp))
			} else {
				settingsStore.setTasksListMessage('List tasks is empty')
			}
		}
	} catch (err) {
		settingsStore.setTasksListMessage('Server unavailable')
		console.error(err)
	}
}
