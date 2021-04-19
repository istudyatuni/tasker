import Cookies from 'js-cookie'
import { makeAutoObservable } from 'mobx'

export class SettingsStore {
	tasksListMessage = 'No tasks'
	showFinished = Cookies.get('show-finished') === 'true' || false

	constructor() {
		makeAutoObservable(this)
	}

	setTasksListMessage(m: string) {
		this.tasksListMessage = m
	}

	toggleShowFinished() {
		this.showFinished = !this.showFinished
		Cookies.set('show-finished', this.showFinished.toString())
	}
}
