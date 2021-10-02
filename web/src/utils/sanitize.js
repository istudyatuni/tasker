export function scriptSanitize(html_text) {
	return html_text
		.replaceAll('<script', '&lt;script&gt;')
		.replaceAll('</script>', '&lt;/script&gt;')
		// inline scripts like onclick, etc
		.replaceAll(/(<[^<>]+ )on([^<>]+>)/gi, '')
}
