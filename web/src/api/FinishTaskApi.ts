import { SetUpdatedTask } from 'api/helpers/setUpdatedTask'

import IResponse from 'interfaces/IResponse'

export const FinishTask = async(id: string, status: boolean) => {
	let response = await fetch('/api/finish', {
		method: 'PATCH',
		body: JSON.stringify({
			task_id: id,
			status: status
		})
	})

	let resp = await response.json() as IResponse

	if(resp.status) {
		SetUpdatedTask(id)
	}
}
