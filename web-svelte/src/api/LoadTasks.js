export const LoadTasks = async () => {
	try	{
		const response = await fetch('/api/tasks', {
			method: 'GET'
		})

		if(response.ok) {
			let resp = await response.json()
			if(resp.length) {
				return resp;
			} else {
				return []
			}
		}
	} catch (err) {
		console.error('Server unavailable:', err)
	}
}
