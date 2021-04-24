export interface IImport {
	button: IButton,
	status: boolean|null,
}

interface IButton {
	text: string,
	is_negative: boolean,
}
