import IResponse from 'interfaces/IResponse'

export const ImportTasks = async(data: string):Promise<IResponse> => {
	let response = await fetch('/api/import', {
		method: 'POST',
		body: data
	})
	if(response.ok) {
		return {
			status: true,
			message: "File imported"
		}
	} else {
		console.error(response)
		return {
			status: false,
			message: "Some error"
		}
	}
}
