export function scriptSanitize(html_text) {
	let result = html_text
		.replaceAll('<script>', '&lt;script&gt;')
		.replaceAll('</script>', '&lt;/script&gt;')

	// inline scripts like onclick, etc
	result = result.replaceAll(/(<[^<>]+ )on([^<>]+>)/gi, '')

	return result
}
