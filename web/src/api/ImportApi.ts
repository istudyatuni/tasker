export const ImportTasks = async(data: string) => {
	let response = await fetch('/api/import', {
		method: 'POST',
		body: data
	})
	if(response.ok) {
		console.log('sending file')
	} else {
		console.log(response)
	}
}
