import { writable } from 'svelte/store'

function localKeyValueStore(name, initial = {}) {
	const toString = (value) => JSON.stringify(value, null, 2)
	const toObject = JSON.parse

	if (localStorage.getItem(name) === null) {
		localStorage.setItem(name, toString(initial))
	}

	const saved = toObject(localStorage.getItem(name))

	const { subscribe, set, update } = writable(saved)

	return {
		subscribe,
		set: (key, value) => update(data => {
			data[key] = value
			localStorage.setItem(name, toString(data))
			return data
		}),
		delete: (key) => update(data => {
			delete data[key]
			localStorage.setItem(name, toString(data))
			return data
		})
	}
}

// set: settings.set('key', 'value')
// get: settings.key
export const settings = localKeyValueStore('settings')
