import { LoadTaskById } from './LoadTasks.js'

import { tasks } from 'src/stores/tasks.js'

export async function UpdateTask(data) {
	let response = await fetch('/api/update', {
		method: 'PATCH',
		body: JSON.stringify(data)
	})

	let resp = await response.json()

	if(resp.status && data.task_id) {
		const task = await LoadTaskById(data.task_id)
		if (task !== null) {
			tasks.update(data.task_id, task)
			return true
		}
	}

	return false
}
