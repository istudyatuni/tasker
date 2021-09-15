import { LoadTaskById } from './LoadTasks.js'

export async function SendNewTask(task) {
	const response = await fetch('/api/task', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task)
	})

	let resp = await response.json()
	if('task_id' in resp) {
		return await LoadTaskById(resp.task_id)
	}

	return false
}
