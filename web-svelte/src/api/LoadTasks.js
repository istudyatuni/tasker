import { tasks } from 'src/stores/tasks.js'

export const LoadTasks = async () => {
	try	{
		const response = await fetch('/api/tasks', {
			method: 'GET'
		})

		if(response.ok) {
			let resp = await response.json()
			if(resp.length) {
				tasks.set(resp)
			} else {
				tasks.set([])
			}
			return true
		}
	} catch (err) {
		console.error('Server unavailable:', err)
		return false
	}
}
