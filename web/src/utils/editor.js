import { get } from 'svelte/store'

import { settings } from 'src/stores/settings.js'
import { tasks } from 'src/stores/tasks.js'

const states = new Set(['close', 'edit', 'create'])

export function edit(state, task_id = '') {
	if (!states.has(state)) {
		throw 'Unknown editor state'
	}

	settings.set('editor', {
		state,
		task: state === 'edit'
			? get(tasks).find((t) => t.task_id === task_id) : {},
	})
}
