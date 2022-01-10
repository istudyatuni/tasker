import { get } from 'svelte/store'

import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

import { isOffline } from 'src/utils/offline.js'
import { writeFile } from 'src/utils/fs.js'

export async function DeleteTaskLocal(id) {
	tasks.delete(id, true)
	await writeFile(get(tasks))
	notify('Task deleted', 'success')

	return true
}

export async function DeleteTask(id) {
	if (isOffline()) {
		return DeleteTaskLocal(id)
	}
	return false
}
