export interface ITask {
	name: string;
	description: string;
	finished: boolean;
	info: ITaskInfo;
}

export interface ITaskInfo {
	full_name: string;
	subject: string;
	list_items: string[];
}
