<script>
	import { LoadTasks } from 'src/api/LoadTasks.js'

	import SettingsBox from 'src/components/SettingsBox.svelte'
	import TasksList from 'src/components/TasksList.svelte'

	let tasks = LoadTasks()
</script>

<main class="container is-max-desktop pt-5">
	<h1 class="title">Tasks</h1>
	<SettingsBox />

	{#await tasks}
		<p>Loading...</p>
	{:then data}
		<TasksList tasks={data} />
	{:catch e}
		<p>Failed to load tasks: {JSON.stringify(e)}</p>
	{/await}
</main>
