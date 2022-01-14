<script context="module">
	import { getVersion } from 'src/api/version.js'

	// build_sha is global variable from index.html
	let sha = build_sha.slice(0, 7)

	function tagColor(curr) {
		return build_sha === curr ? 'success' : 'warning'
	}
	function isDisplay(curr) {
		return build_sha !== curr
	}
</script>

<script>
	let promise = getVersion()
</script>

<h1 class="title">
	Tasks
	{#await promise then version}
		{#if version}
			<div class="hover">
				<a
					href="https://github.com/istudyatuni/tasker"
					class="link tag is-{tagColor(version)} is-light is-normal"
					tabindex="0">
					{sha}
				</a>
				<div
					class="hover is-size-7 has-text-weight-normal"
					class:is-hidden={!isDisplay(version)}>
					Newer version is available, refresh page (ctrl+F5)
				</div>
			</div>
		{/if}
	{/await}
</h1>

<style>
	div.hover {
		display: inline;
	}
	div.hover > div {
		display: none;
	}
	.hover:hover > div {
		display: initial;
		position: relative;
		bottom: 0.25em;
	}
</style>
