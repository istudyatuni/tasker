import Cookies from 'js-cookie'
import { makeAutoObservable } from 'mobx'

export class SettingsStore {
	listMessage = 'No tasks'
	showFinished = Cookies.get('show-finished') === 'true' || false

	constructor() {
		makeAutoObservable(this)
	}

	setMessage(m: string) {
		this.listMessage = m
	}

	toggleShowFinished() {
		this.showFinished = !this.showFinished
		Cookies.set('show-finished', this.showFinished.toString())
		console.log('show')
	}
}
