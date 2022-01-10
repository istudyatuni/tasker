import { get } from 'svelte/store'
import { settings } from 'src/stores/settings.js'

const initialSettings = {
	show_finished: true,
	// ignore single line breaks as in markdown specs
	strict_line_breaks: true,
	editor: {
		// close, edit, create
		state: 'close',
		task: {}
	},
	// none, wait (for file), ready
	offline: 'none',
}

export async function initSettings() {
	const s = get(settings)

	for (let key of Object.keys(initialSettings)) {
		if (s[key] === undefined) {
			settings.set(key, initialSettings[key])
		}
	}
}
