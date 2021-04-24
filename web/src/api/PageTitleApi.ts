export const LoadPageTitle = async () => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		let response = await fetch('/api/page_title')
		document.title += await response.text()
	}
}
