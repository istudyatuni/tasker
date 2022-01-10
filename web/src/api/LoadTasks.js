import { initOffline } from 'src/utils/offline'

import { tasks } from 'src/stores/tasks.js'

export async function LoadTasks() {
	try {
		const response = await fetch('/api/tasks', {
			method: 'GET'
		})

		if(response.ok) {
			let resp = await response.json()
			if(resp.length) {
				tasks.set(resp)
			} else {
				tasks.set([])
			}
			return true
		}
	} catch (err) {
		console.error('Server unavailable:', err)

		// we can't connect to server, so work in offline mode
		initOffline()

		return false
	}
}

export async function LoadTaskById(task_id) {
	const response = await fetch('/api/task?task_id=' + task_id, {
		method: 'GET'
	})

	if(response.ok) {
		return await response.json()
	}

	return null
}
