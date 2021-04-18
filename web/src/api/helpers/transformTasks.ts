import ITasksList from 'interfaces/ITasksList'
import { ITask } from 'interfaces/ITask'

////// ITaskList to ITask //////

export const TasksListElement2Task = (task: ITasksList): ITask => {
	return {
		task_id: task.task_id,
		name: task.name,
		description: task.description,
		finished: task.finished,
		info: {
			full_name: task.full_name,
			subject: task.subject,
			// in markdown you need double \n for line break
			other_text: task.other_text.replaceAll('\n', '\n\n'),
		}
	}
}

export const TasksListArray2Task = (tasks?: ITasksList[]): ITask[] => {
	if(tasks===undefined) {
		return []
	}
	let new_tasks:ITask[] = tasks.map(e => TasksListElement2Task(e))
	return new_tasks
}

////// ITask to ITaskList //////

export const Task2TasksListElement = (task: ITask): ITasksList => {
	return {
		task_id: task.task_id,
		name: task.name,
		full_name: task.info.full_name,
		subject: task.info.subject,
		description: task.description,
		finished: task.finished,
		other_text: task.info.other_text
	}
}
