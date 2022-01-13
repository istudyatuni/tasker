export async function getVersion() {
	const response = await fetch('version.txt')
	return (await response.text()).slice(0, 7)
}
