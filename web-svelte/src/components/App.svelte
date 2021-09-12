<script>
	import { LoadTasks } from 'src/api/LoadTasks.js'

	import SettingsBox from 'src/components/SettingsBox.svelte'
	import TasksList from 'src/components/TasksList.svelte'

	let promise = LoadTasks()
</script>

<main class="container is-max-desktop pt-5">
	<h1 class="title">Tasks</h1>
	<SettingsBox />

	{#await promise}
		<p>Loading...</p>
	{:then status}
		{#if status}
			<TasksList />
		{:else}
			<p class="notification is-danger">Failed to load tasks</p>
		{/if}
	{/await}
</main>
