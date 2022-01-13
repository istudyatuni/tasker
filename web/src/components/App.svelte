<script context="module">
	import { LoadTasks } from 'src/api/LoadTasks.js'

	import SettingsBox from 'src/components/SettingsBox.svelte'
	import TaskInputModal from 'src/components/TaskInputModal.svelte'
	import TasksList from 'src/components/TasksList.svelte'
	import Notification from 'src/components/Notification.svelte'
	import OfflineNotification from 'src/components/OfflineNotification.svelte'

	import { settings } from 'src/stores/settings.js'
	import { tasks } from 'src/stores/tasks.js'

	import { edit } from 'src/utils/editor.js'
	import { initSettings } from 'src/utils/defaultSettings.js'

	edit('close')
	initSettings()
</script>

<script>
	let promise = LoadTasks()

	// except deleted
	$: finished = $tasks.filter((t) => t.finished && !t.deleted).length
	$: total = $tasks.filter((t) => !t.deleted).length
	$: finished_percent = (finished * 100) / total

	$: deleted = $tasks.filter((t) => t.deleted).length
</script>

<main class="container is-max-desktop pt-5 pl-3 pr-3">
	<h1 class="title">Tasks</h1>
	{#if $settings.offline !== 'wait'}
		<SettingsBox />

		{#if !$settings.show_trash}
			<p class="block">
				Finished {finished}/{total} ({finished_percent}%)
			</p>
		{:else}
			<p class="block">Deleted {deleted}</p>
		{/if}
	{/if}

	{#await promise}
		<p>Loading...</p>
	{:then status}
		{#if status}
			<TasksList />
		{/if}
	{/await}

	{#if $settings.offline === 'wait'}
		<OfflineNotification />
	{:else if $settings.offline === 'ready'}
		<TasksList />
	{/if}

	<Notification />

	<TaskInputModal />
</main>

<style>
	main {
		padding-bottom: 5em;
	}
</style>
