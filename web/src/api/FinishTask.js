import { get } from 'svelte/store'

import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

import { isOffline } from 'src/utils/offline.js'
import { writeFile } from 'src/utils/fs.js'

export async function FinishTaskLocal(id, status) {
	tasks.finish(id, status)
	writeFile(get(tasks))
}

export async function FinishTask(id, status) {
	if (isOffline()) {
		return FinishTaskLocal(id, status)
	}

	let response = await fetch('/api/finish', {
		method: 'PATCH',
		body: JSON.stringify({
			task_id: id,
			status: status
		})
	})

	let resp = await response.json()

	if(resp.status) {
		tasks.finish(id, status)
	} else {
		notify('Failed to mark the task as completed', 'error')
	}
}
