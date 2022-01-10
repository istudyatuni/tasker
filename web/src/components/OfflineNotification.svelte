<script context="module">
	import { openLocalFile, createLocalFile, isFsSupported } from 'src/utils/fs.js'
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
			Unfortunately, your browser does not support the <code>File System Access API</code>
			for working with local files. You can check which browsers support it on
			<a href="https://caniuse.com/native-filesystem-api">this page</a>
		</p>
	</div>
{/if}

<style>
	code {
		border-radius: 2px;
	}
</style>
