function extractSha(message) {
	const m = message.match(/tasker@(\w+)/)
	return m.length > 1 ? m[1] : ''
}

export async function getVersion() {
	const response = await fetch('https://api.github.com/repos/istudyatuni/tasker/commits?per_page=1&sha=gh-pages')
	if (response.ok) {
		return extractSha((await response.json())[0].commit.message)
	}
	return ''
}
