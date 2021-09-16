import { notify } from 'src/utils/notify.js'

export async function DownloadTasks() {
	const response = await fetch('/api/download')
	const blob = await response.blob()

  const a = document.createElement("a");
  a.setAttribute("download", 'export.json');
  a.href = URL.createObjectURL(blob);
  a.click();
}

export async function UploadTasks(data) {
	console.log('upload')
	let response = await fetch('/api/upload', {
		method: 'POST',
		body: data
	})

	if(response.ok) {
		notify('Tasks were successfully imported', 'success')
		return true
	} else {
		console.error(response)
		notify('Failed to import tasks', 'error')
		return false
	}
}
