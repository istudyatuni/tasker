import TurndownService from 'turndown'

const turndownService = new TurndownService({
	codeBlockStyle: 'fenced',
	emDelimiter: '*',
	headingStyle: 'atx',
	hr: '---',
})

export function turndown(str) {
	return turndownService.turndown(str)
}
