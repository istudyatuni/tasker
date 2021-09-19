import { settings } from 'src/stores/settings.js'

const states = new Set(['close', 'edit', 'create'])

export function edit(state, task_id = '') {
	if (!states.has(state)) {
		throw 'Unknown editor state'
	}

	settings.set('editor', { state, task_id })
}
