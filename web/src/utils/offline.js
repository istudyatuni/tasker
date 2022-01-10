import { get } from 'svelte/store'

import { settings } from 'src/stores/settings.js'

export function initOffline() {
	settings.set('offline', 'wait')
}

export function offlineReady() {
  settings.set('offline', 'ready')
}

export function isOffline() {
	return get(settings).offline !== 'none'
}
