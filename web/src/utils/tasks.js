export function getSubjects(tasks) {
	let subjects = tasks.map(e => e.subject).filter(e => e)

	// Set for unique
	return [...new Set(subjects)]
}

// fields 'task_id' and 'finished' are ommited
const defaultTask = {
	description: '',
	full_name: '',
	name: '',
	other_text: '',
	subject: '',
}

/**
 * Fill non-presented fields in task.
 *
 * What happened inside
 *
 * ```js
 * let a = {a: ''}
 * {...a, ...{a: 'b'}} // -> {a: 'b'}
 * {...{a: 'b'}, ...a} // -> {a: ''}
 * ```
 *
 * @param  {Object} task Task with possible missing fields
 * @return {Object}      Task with filled missing fields
 */
export function fillEmptyFields(task) {
	return {...defaultTask, ...task}
}
