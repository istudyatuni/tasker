<script context="module">
	import { settings } from 'src/stores/settings.js'
	import { tasks } from 'src/stores/tasks.js'

	import TaskItem from 'src/components/TaskItem.svelte'
</script>

{#if $tasks.length === 0}
	<p class="notification is-success">The task list is empty</p>
{:else if !$settings.show_finished && $tasks.every((task) => task.finished)}
	<p class="notification is-success">All tasks are finished!</p>
{:else}

	{#each $tasks as task}
		{#if !task.finished || $settings.show_finished}
			<div class="box">
				<TaskItem {task} />
			</div>
		{/if}
	{/each}

{/if}
