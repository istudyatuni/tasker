import { SetUpdatedTask } from 'api/helpers/setUpdatedTask'

import { ITask } from 'interfaces/ITask'
import IResponse from 'interfaces/IResponse'

import {
	Task2TasksListElement,
} from 'api/helpers/transformTasks'


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
