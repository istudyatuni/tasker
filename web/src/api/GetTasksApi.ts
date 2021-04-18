import ITasksList from 'interfaces/ITasksList'

import { TaskListArray2Task } from 'api/helpers/transformTasks'

import { stores } from 'stores/stores'

export const GetTasks = async () => {
	try	{
		let tasksStore = stores.tasksStore

		const response = await fetch('/api/tasks', {
			method: 'GET'
		})

		if(response.ok) {
			let resp = await response.json() as ITasksList[];
			tasksStore.setAll(TaskListArray2Task(resp))
		}
	} catch (err) {
		console.error(err)
	}
}
