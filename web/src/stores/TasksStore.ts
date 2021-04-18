import { action, computed, observable } from 'mobx'

import { ITask } from 'interfaces/ITask'

export class TasksStore {
	@observable
	tasks: ITask[] = []
	opened: boolean[] = []

	@action
	add(task: ITask) {
		this.tasks.unshift(task)
		this.opened.unshift(false)
	}

	@action
	update(task_id: string, task: ITask) {
		// maybe faster use bin search
		let ind = this.tasks.findIndex(e => e.task_id === task_id)
		if (ind !== -1) {
			this.tasks[ind] = task
		}
	}

	@action
	setAll(list: ITask[]) {
		this.tasks = list
		this.opened = Array(this.tasks.length).fill(false)
	}

	@computed
	get getAll(): ITask[] {
		return this.tasks
	}

	@action
	toggleOpen(index: number) {
		if (this.tasks.length > 0) {
			this.opened[index] = !this.opened[index]
		}
	}
}
