export async function getVersion() {
	const response = await fetch('https://api.github.com/repos/istudyatuni/tasker/commits?per_page=1')
	if (response.ok) {
		return (await response.json())[0].sha
	}
	return ''
}
