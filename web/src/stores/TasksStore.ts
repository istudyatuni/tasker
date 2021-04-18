import { makeAutoObservable } from 'mobx'

import { ITask } from 'interfaces/ITask'

export class TasksStore {
	tasks: ITask[] = []
	opened: boolean[] = []

	constructor() {
		makeAutoObservable(this)
	}

	add(task: ITask) {
		this.tasks.unshift(task)
		this.opened.unshift(false)
	}

	update(task_id: string, task: ITask) {
		// maybe faster use bin search
		let ind = this.tasks.findIndex(e => e.task_id === task_id)
		if (ind !== -1) {
			this.tasks[ind] = task
		}
	}

	setAll(list: ITask[]) {
		this.tasks = list
		this.opened = Array(this.tasks.length).fill(false)
	}

	get getAll(): ITask[] {
		return this.tasks
	}

	toggleOpen(index: number) {
		if (this.tasks.length > 0) {
			this.opened[index] = !this.opened[index]
		}
	}
}
