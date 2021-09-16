import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

export const FinishTask = async (id, status) => {
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
