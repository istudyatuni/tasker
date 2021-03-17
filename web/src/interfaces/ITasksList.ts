export default interface ITasksList {
	task_id: string|null;
	name: string;
	full_name: string;
	subject: string;
	description: string;
	finished: boolean;
	other_text: string;
}
