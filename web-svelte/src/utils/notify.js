import { get } from 'svelte/store'

import { notifications } from 'src/stores/notifications.js'

function pop_note() {
	notifications.pop()
}

const levels = {
	success: 'success',
	warning: 'warning',
	danger: 'danger'
}

export function notify(message, level, delay = 5000) {
	if (get(notifications).length > 0) {
		pop_note()
	}

	notifications.push({
		message: message,
		level: levels[level]
	})

	setTimeout(pop_note, delay)
}
