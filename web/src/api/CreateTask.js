import { LoadTaskById } from './LoadTasks.js'

import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

export async function SendNewTask(task) {
	const response = await fetch('/api/task', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task)
	})

	let resp = await response.json()
	if('task_id' in resp) {
		const task = await LoadTaskById(resp.task_id)
		if (task !== null) {
			tasks.push(task)
			notify('Task added', 'success')
			return true
		}
	}

	if (resp.status === false) {
		notify('Error: ' + resp.message, 'error')
	}

	return false
}
