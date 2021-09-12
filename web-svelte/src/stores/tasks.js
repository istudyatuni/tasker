import { writable } from 'svelte/store'

// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#how_to_implement_a_store_contract_the_theory
function tasksStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		set,
		update: (id, task) => {
			const i = data.findIndex(e => e.task_id === id)
			if (i !== -1) {
				return update(tasks => {
					tasks[i] = task
					return tasks
				})
			}

			console.error('Not found task with id ', id)
		},
		push: (task) => update(tasks => tasks.push(task))
	}
}

export const tasks = tasksStore()
