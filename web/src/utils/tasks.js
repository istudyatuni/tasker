import { get } from 'svelte/store'

export function getSubjects(tasks) {
	let subjects = tasks.map(e => e.subject).filter(e => e)

	// Set for unique
	return [...new Set(subjects)]
}
