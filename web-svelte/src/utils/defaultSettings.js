import { settings } from 'src/stores/settings.js'

const initialSettings = {
	show_finished: true,
	// ignore single line breaks as in markdown specs
	strict_line_breaks: true,
}

export function initSettings(current_settings) {
	for (let key of Object.keys(initialSettings)) {
		if (current_settings[key] === undefined) {
			settings.set(key, initialSettings[key])
		}
	}
}
