<script context="module">
	import { openLocalFile, createLocalFile } from 'src/utils/fs.js'
</script>

<div class="mt-2 notification is-success">
	<p class="block">
		Couldn't connect to server, work offline, saving data to a file.
	</p>
	<button class="button" on:click={openLocalFile}>Open existing file</button>
	<button class="button" on:click={createLocalFile}>Create a new file</button>
</div>
