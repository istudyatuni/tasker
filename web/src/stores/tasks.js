import { derived, writable } from 'svelte/store'

import { settings } from 'src/stores/settings.js'

// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#how_to_implement_a_store_contract_the_theory
function tasksStore() {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,
		set,
		update: (id, task) => update(tasks => {
			const i = tasks.findIndex(e => e.task_id === id)
			if (i !== -1) {
				tasks[i] = {...task}
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
		push: (task) => update(tasks => [task, ...tasks]),
		delete: (id, status, trash) => update(tasks => {
			const i = tasks.findIndex(e => e.task_id === id)
			if (i !== -1) {
				if (trash) {
					// delete to trash / restore back
					tasks[i].deleted = status
				} else {
					// delete forever
					tasks.splice(i, 1)
				}
				return tasks
			}

			console.error('Not found task with id ', id)
		})
	}
}

export const tasks = tasksStore()

export const subjects = derived(tasks,
	$tasks => [...new Set(
		$tasks
			.map(e => e.subject)
			.filter(e => e)
		)
	]
)

export const filtered = derived([tasks, settings],
	([$tasks, $settings]) => {
		const sub = $settings.filterSubject

		// not deleted
		const $t = $tasks.filter(t => !t.deleted)

		// if sub !== '', filter by subject
		return sub ? $t.filter(t => t.subject === sub) : $t
	}
)

export const deleted = derived(tasks,
	$tasks =>  $tasks.filter(t => t.deleted)
)
