<script context="module">
	import { getVersion } from 'src/api/version.js'

	// build_sha is global variable from index.html
	let sha = build_sha.slice(0, 7)

	function tagColor(curr) {
		return build_sha === curr ? 'success' : 'warning'
	}
	function tagTitle(curr) {
		return build_sha === curr ? '' : 'Newer version is available, refresh page'
	}
</script>

<script>
	let promise = getVersion()
</script>

<h1 class="title">
	Tasks
	{#await promise then version}
		{#if version}
			<a
				href="https://github.com/istudyatuni/tasker"
				class="link tag is-{tagColor(version)} is-light is-normal"
				title={tagTitle(version)}
				tabindex="0">
				{sha}
			</a>
		{/if}
	{/await}
</h1>
