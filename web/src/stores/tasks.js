import { writable } from 'svelte/store'

// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#how_to_implement_a_store_contract_the_theory
function tasksStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		set,
		update: (id, task) => update(tasks => {
			const i = tasks.findIndex(e => e.task_id === id)
			if (i !== -1) {
				tasks[i] = task
				return tasks
			}

			console.error('Not found task with id ', id)
		}),
		finish: (id, status) => update(tasks => {
			const i = tasks.findIndex(e => e.task_id === id)
			if (i !== -1) {
				tasks[i].finished = status
				return tasks
			}

			console.error('Not found task with id ', id)
		}),
		push: (task) => update(tasks => [task, ...tasks])
	}
}

export const tasks = tasksStore()
