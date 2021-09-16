// https://marked.js.org/using_pro#walk-tokens
export const walkTokens = (token) => {
	console.log(token, token.href, token.target)
	if (token.type === 'link') {
		token.target = '_blank'
	}
}
