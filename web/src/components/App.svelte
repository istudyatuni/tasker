<script>
	import { LoadTasks } from 'src/api/LoadTasks.js'

	import SettingsBox from 'src/components/SettingsBox.svelte'
	import TaskInputModal from 'src/components/TaskInputModal.svelte'
	import TasksList from 'src/components/TasksList.svelte'
	import Notification from 'src/components/Notification.svelte'

	import { settings } from 'src/stores/settings.js'

	import { edit } from 'src/utils/editor.js'
	import { initSettings } from 'src/utils/defaultSettings.js'

	edit('close')
	initSettings()

	let promise = LoadTasks()
</script>

<main class="container is-max-desktop pt-5 pb-5 pl-3 pr-3">
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

	<Notification />

	<TaskInputModal />
</main>
