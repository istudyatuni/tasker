<script context="module">
	import {
		openLocalFile,
		createLocalFile,
		isFsSupported,
	} from 'src/utils/fs.js'
</script>

<script>
	// nbsp for showing this name in one line
	const apiName = 'File System Access API'.replace(/ /g, '&nbsp;')
</script>

{#if isFsSupported()}
	<div class="mt-2 notification is-success">
		<p class="block">
			Couldn't connect to server, work offline, saving data to a file.
		</p>
		<button class="button" on:click={openLocalFile}>Open existing file</button>
		<button class="button" on:click={createLocalFile}>Create a new file</button>
	</div>
{:else}
	<div class="mt-2 notification is-danger has-text-white is-size-5">
		<p class="block">
			Couldn't connect to server, tried to work offline, but unfortunately your
			browser does not support the <code>{@html apiName}</code> for working with
			local files. You can check which browsers support it on
			<a href="https://caniuse.com/native-filesystem-api">this page</a>
		</p>
	</div>
{/if}

<style>
	code {
		border-radius: 2px;
	}
</style>
