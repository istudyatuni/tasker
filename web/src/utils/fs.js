import { LoadTasksLocal } from 'src/api/LoadTasks'

import { offlineReady } from 'src/utils/offline'

const opts = {
	types: [
		{
			description: 'JSON',
			accept: {
				'application/json': ['.json']
			}
		},
	],
	excludeAcceptAllOption: true,
}

const pickerOpts = {
	...opts,
	multiple: false,
};

const saveOpts = {
	...opts,
	suggestedName: 'tasker-data.json',
}

let fileHandle = null

// helpers

function object2blob(obj) {
	return new Blob([JSON.stringify(obj, null, 2)], {type: 'application/json'})
}

// opening

export async function openLocalFile() {
	[fileHandle] = await window.showOpenFilePicker(pickerOpts);
	offlineReady()
	LoadTasksLocal()
}

export async function createLocalFile() {
	fileHandle = await window.showSaveFilePicker(saveOpts)
	await writeFile([])
	offlineReady()
}

// read / write

export async function writeFile(data) {
	if (!fileHandle) {
		return
	}

	const writableStream = await fileHandle.createWritable()
	await writableStream.write(object2blob(data))
	await writableStream.close()
}

/**
 * Read file with tasks
 *
 * @return {Promise<Array>} tasks
 */
export async function readFile() {
	if (!fileHandle) {
		throw 'File handle is not defined'
	}

	const file = await fileHandle.getFile()
	return JSON.parse(await file.text())
}
