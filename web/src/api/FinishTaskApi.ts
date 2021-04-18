export const FinishTask = async(id: string, status: boolean) => {
	// eslint-disable-next-line
	let response = await fetch('/api/finish', {
		method: 'PATCH',
		body: JSON.stringify({
			task_id: id,
			status: status
		})
	})
}
