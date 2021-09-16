import { writable } from 'svelte/store'

function notificationsStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		set,
		push: (n) => update(ns => [...ns, n]),
		pop: () => update(ns => {
			ns.shift()
			return ns
		})
	}
}

export const notifications = notificationsStore()
