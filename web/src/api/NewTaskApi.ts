import { ITask } from 'interfaces/ITask'
import ITasksList from 'interfaces/ITasksList'
import IResponse from 'interfaces/IResponse'

import {
	TasksListElement2Task,
	Task2TasksListElement,
} from 'api/helpers/transformTasks'

import { stores } from 'stores/stores'

const SetNewTask = async(task_id: string) => {
	let response = await fetch('/api/task?task_id=' + task_id, {
		method: 'GET'
	})
	if(response.ok) {
		let resp = await response.json() as ITasksList
		let task: ITask = TasksListElement2Task(resp)

		let tasksStore = stores.tasksStore
		tasksStore.add(task)
	}
}

export const SendNewTask = async (task: ITask):Promise<IResponse> => {
	const response = await fetch('/api/task', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(Task2TasksListElement(task))
	})

	let resp = await response.json()
	if('task_id' in resp) {
		SetNewTask(resp.task_id)
	}

	return resp as IResponse
}
