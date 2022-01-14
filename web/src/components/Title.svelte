<script context="module">
	import { getVersion } from 'src/api/version.js'
</script>

<script>
	let promise = getVersion()
</script>

<h1 class="title">
	Tasks
	{#await promise then version}
		<a
			href="https://github.com/istudyatuni/tasker"
			class="link tag is-success is-light is-normal">
			{version}
		</a>
	{/await}
</h1>
