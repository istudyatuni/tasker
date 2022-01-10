import { get } from 'svelte/store'

import { LoadTaskById } from './LoadTasks.js'

import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

import { isOffline } from 'src/utils/offline.js'
import { writeFile } from 'src/utils/fs.js'

export async function UpdateTaskLocal(task) {
	tasks.update(task.task_id, task)
	writeFile(get(tasks))
	notify('Task updated', 'success')
	return true
}

export async function UpdateTask(data) {
	if (isOffline()) {
		return UpdateTaskLocal(data)
	}

	let response = await fetch('/api/update', {
		method: 'PUT',
		body: JSON.stringify(data)
	})

	let resp = await response.json()

	if(resp.status && data.task_id) {
		const task = await LoadTaskById(data.task_id)
		if (task !== null) {
			tasks.update(data.task_id, task)
			notify('Task updated', 'success')
			return true
		}
	}

	if (resp.status === false) {
		notify('Error: ' + resp.message, 'error')
	}

	return false
}
