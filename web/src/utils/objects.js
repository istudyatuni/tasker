export function objectFromKeys(keys, initial) {
	let res = {}
	for (let key of keys) {
		res[key] = initial
	}
	return res
}
