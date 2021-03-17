export interface ITask {
	task_id: string|null;
	name: string;
	description: string;
	finished: boolean;
	info: ITaskInfo;
}

export interface ITaskInfo {
	full_name: string;
	subject: string;
	other_text: string;
}
