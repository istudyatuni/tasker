import { get } from 'svelte/store'

import { tasks } from 'src/stores/tasks.js'
import { notify } from 'src/utils/notify.js'

import { isOffline } from 'src/utils/offline.js'
import { writeFile } from 'src/utils/fs.js'

/**
 * Delete task
 *
 * Default is delete to trash
 *
 * @param {[type]}  id             [description]
 * @param {Boolean} options.status [description]
 * @param {Boolean} options.trash  [description]
 */
export async function DeleteTaskLocal(id, status = true, trash = true) {
	tasks.delete(id, status, trash)
	await writeFile(get(tasks))
	notify('Task ' + (status ? 'deleted' : 'restored'), 'success')

	return true
}

export async function DeleteTask(id, status = true, trash = true) {
	if (isOffline()) {
		return DeleteTaskLocal(id, status, trash)
	}
	return false
}
