import React, {
	useRef,
} from 'react';
import {
	Button,
} from 'semantic-ui-react'
import { Observer } from 'mobx-react-lite'

import { ImportTasks } from 'api/ImportApi'
import { LoadTasks } from 'api/LoadTasksApi'

import { useStore } from 'stores/hooks'

function ImportFile() {
	const settingsStore = useStore('settingsStore')

	const inputFile = useRef<HTMLInputElement>(null)

	const onButtonClick = () => {
		if(inputFile.current!==null) {
			inputFile.current.click()
		}
		let file = document.getElementById('import-file')
		if(file) {
			file.onchange = () => {
				let submit = document.getElementById('submit-import') as HTMLInputElement
				if(submit) {
					submit.click()
				}
			}
		}
	}

	async function uploadFile() {
		let input_files = document.getElementById('import-file') as HTMLInputElement
		let file: File

		if(input_files && input_files.files) {
			file = input_files.files[0]
			let reader = new FileReader()
			reader.readAsText(file, 'UTF-8')

			reader.onloadend = () => {
				if(reader.result) {
					(async () => {
						let result = await ImportTasks(reader.result as string)
						if(result.status) {
							LoadTasks()
						} else {
							settingsStore.setImportButton('Error importing', true)
							setTimeout(function(){
								settingsStore.setImportButton('Import tasks', false)
							}, 1500)
						}
					})();
				}
			}
		}
	}

	return (
		<Observer>
		{() => (
		<>
			<Button
				negative={settingsStore.import.button.is_negative}
				content= {settingsStore.import.button.text}
				onClick={onButtonClick}
			/>
			<input type="file" id="import-file" ref={inputFile} style={{display: 'none'}} />
			<input type="submit" id="submit-import" onClick={uploadFile} style={{display: 'none'}} />
		</>
		)}
		</Observer>
	);
}

export default ImportFile;
