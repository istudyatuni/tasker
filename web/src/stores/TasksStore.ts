import { action, observable } from 'mobx'

import { ITask } from 'interfaces/ITask'

export default class TasksStore {
	@observable
	tasks: ITask[] = []

	@action
	add(task: ITask) {
		this.tasks.push(task)
	}

	@action
	update(task_id: string, task: ITask) {
		// maybe better use bin search
		let ind = this.tasks.findIndex(e => e.task_id === task_id)
		if (ind !== -1) {
			this.tasks[ind] = task
		}
	}

	@action
	setAll(list: ITask[]) {
		this.tasks = list
	}

	@action
	getAll(): ITask[] {
		return this.tasks
	}
}
