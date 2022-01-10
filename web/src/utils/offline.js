import { settings } from 'src/stores/settings.js'

export function initOffline() {
	settings.set('offline', 'wait')
}

export function offlineReady() {
  settings.set('offline', 'ready')
}
