import Cookies from 'js-cookie'
import { action, observable } from 'mobx'

export class SettingsStore {
	@observable
	listMessage = 'No tasks'
	showFinished = Cookies.get('show-finished') === 'true' || false

	@action
	setMessage(m: string) {
		this.listMessage = m
	}

	@action
	toggleShowFinished() {
		this.showFinished = !this.showFinished
		Cookies.set('show-finished', this.showFinished.toString())
		console.log('show')
	}
}
