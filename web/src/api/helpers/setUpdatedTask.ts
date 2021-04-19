import { ITask } from 'interfaces/ITask'
import ITasksList from 'interfaces/ITasksList'

import {
	TasksListElement2Task,
} from 'api/helpers/transformTasks'

import { stores } from 'stores/stores'

export const SetUpdatedTask = async(task_id: string) => {
	let response = await fetch('/api/task?task_id=' + task_id, {
		method: 'GET'
	})
	if(response.ok) {
		let resp = await response.json() as ITasksList
		let task: ITask = TasksListElement2Task(resp)

		let tasksStore = stores.tasksStore
		tasksStore.update(task_id, task)
	}
}
