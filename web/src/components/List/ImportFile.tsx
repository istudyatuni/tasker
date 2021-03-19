import React, {
	useState,
	useRef,
} from 'react';
import {
	Button,
} from 'semantic-ui-react'

import { ImportTasks } from 'api/ImportApi'

function ImportFile() {
	const [buttonText, setButtonText] = useState("Import tasks")

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
							window.location.reload()
						} else {
							setButtonText("Error exporting")
						}
					})();
				}
			}
		}
	}

	return (
		<>
			<Button content={buttonText} onClick={onButtonClick} />
			<input type="file" id="import-file" ref={inputFile} style={{display: 'none'}} />
			<input type="submit" id="submit-import" onClick={uploadFile} style={{display: 'none'}} />
		</>
	);
}

export default ImportFile;
