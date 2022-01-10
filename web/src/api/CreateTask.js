import { get } from 'svelte/store'

import { LoadTaskById } from './LoadTasks.js'

import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

import { fillEmptyFields } from 'src/utils/tasks.js'
import { isOffline } from 'src/utils/offline.js'
import { writeFile } from 'src/utils/fs.js'

async function SendNewTaskLocal(task) {
	if (!task.name) {
		notify('Error: name is required', 'error')
		return false
	}

	let newTask = {
		...fillEmptyFields(task),
		finished: false,
		deleted: false,
		// 'yyyy-mm-ddThh:mm:ss.sssZ' -> 'yyyymmddhhmmsssss'
		task_id: (new Date()).toISOString().replace(/[:\-T\.Z]/g, ''),
	}

	tasks.push(newTask)
	await writeFile(get(tasks))
	notify('Task added', 'success')

	return true
}

export async function SendNewTask(task) {
	if (isOffline()) {
		return SendNewTaskLocal(task)
	}

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
