<script context="module">
	import { DownloadTasks, UploadTasks } from 'src/api/ImportExport.js'
	import { LoadTasks } from 'src/api/LoadTasks.js'
</script>

<script>
	let fileRef
	function openFileDialog() {
		fileRef.click()
	}

	function handleUpload() {
		if (fileRef.files.length === 1) {
			let file = fileRef.files[0]
			let reader = new FileReader()
			reader.readAsText(file, 'UTF-8')

			reader.onloadend = () => {
				if (reader.result) {
					;(async () => {
						let result = await UploadTasks(String(reader.result))
						if (result) {
							LoadTasks()
						}
					})()
				}
			}
		}
	}
</script>

<div class="block">
	<button class="button" on:click={DownloadTasks}>
		<span class="icon">
			<img src="icons/download.svg" alt="" />
		</span>
		<span>Download backup</span>
	</button>

	<button class="button" on:click={openFileDialog}>
		<span class="icon is-180-rotate">
			<img src="icons/download.svg" alt="" />
		</span>
		<span>Export from backup</span>
		<input
			bind:this={fileRef}
			on:change={handleUpload}
			type="file"
			accept=".json"
			name="data"
			class="is-hidden"
		/>
	</button>
</div>

<style type="text/css">
	.is-180-rotate {
		transform: rotate(180deg);
	}
</style>
