import Cookies from 'js-cookie'
import { makeAutoObservable } from 'mobx'

import { IImport } from 'interfaces/stores'

export class SettingsStore {
	tasksListMessage = 'Loading'
	showFinished = Cookies.get('show-finished') === 'true' || false

	import:IImport = {
		button: {
			text: 'Import tasks',
			is_negative: false,
		},
		status: null,
	}

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

	setImportButton(text: string, is_negative: boolean) {
		this.import.button.text = text
		this.import.button.is_negative = is_negative
	}

	setImportStatus(status: boolean|null) {
		this.import.status = status
	}
}
