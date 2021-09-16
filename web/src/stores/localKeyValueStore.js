import { writable } from 'svelte/store'

/**
 * Writable store based on localStorage
 * Example usage:
 * 	const store = localKeyValueStore('dates')
 * 	set: dates.set('key', value)
 * 	get: dates.key
 * @param  {String} name    Name for storing in localStorage
 * @param  {Object} initial Initial object
 * @return {[type]}         [description]
 */
export function localKeyValueStore(name, initial = {}) {
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
