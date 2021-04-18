import { ITask } from 'interfaces/ITask'
import ITasksList from 'interfaces/ITasksList'
import IResponse from 'interfaces/IResponse'

import {
	TasksListElement2Task,
	Task2TasksListElement,
} from 'api/helpers/transformTasks'

import { stores } from 'stores/stores'

const SetUpdatedTask = async(task_id: string) => {
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

export const UpdateTask = async(data: ITask):Promise<IResponse> => {
	let response = await fetch('/api/update', {
		method: 'PATCH',
		body: JSON.stringify(Task2TasksListElement(data))
	})

	let resp = await response.json() as IResponse

	if(resp.status && data.task_id) {
		SetUpdatedTask(data.task_id)
	}

	return resp
}
