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
}

export async function createLocalFile() {
	fileHandle = await window.showSaveFilePicker(saveOpts)
	await writeFile({})
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

export async function readFile() {
	if (!fileHandle) {
		return
	}

	return await fileHandle.getFile()
}
