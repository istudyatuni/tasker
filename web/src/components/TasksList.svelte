<script context="module">
	import { settings } from 'src/stores/settings.js'
	import { tasks } from 'src/stores/tasks.js'

	import TaskItem from 'src/components/TaskItem.svelte'
</script>

{#if $tasks.length === 0 || !$settings.show_trash && $tasks.every((task) => task.deleted)}

<!-- array is empty or all tasks deleted (and trash hidden) -->
	<p class="notification is-success">The task list is empty</p>

{:else if !$settings.show_finished && $tasks.every((task) => task.finished)}

<!-- all tasks finished and finished tasks hidden -->
	<p class="notification is-success">All tasks are finished!</p>

{:else if $settings.show_trash}

<!-- show deleted -->
	{#each $tasks.filter((t) => t.deleted) as task (task.task_id)}
		<div class="box">
			<TaskItem {task} />
		</div>
	{/each}

{:else}

<!-- show tasks -->
	{#each $settings.reverse_list ? $tasks
				.slice()
				.reverse() : $tasks as task (task.task_id)}
		{#if !task.deleted && (!task.finished || $settings.show_finished)}
		<!-- filter out deleted and finished (if finished tasks hidden) -->
			<div class="box">
				<TaskItem {task} />
			</div>
		{/if}
	{/each}

{/if}
