<script context="module">
	import { settings } from 'src/stores/settings.js'
	import { filtered as tasks, deleted } from 'src/stores/tasks.js'

	import TaskItem from 'src/components/TaskItem.svelte'

	/**
	 * Immutable reverse
	 * @param  {any[]} list
	 * @return {any[]}
	 */
	function reverse(list) {
		return list.slice().reverse()
	}
</script>

<script>
	// array is empty or all tasks deleted (and trash hidden)
	$: no_tasks = $tasks.length === 0

	// all tasks finished and finished tasks hidden
	$: all_finished =
		!$settings.show_finished && $tasks.every((task) => task.finished)
</script>

{#if $settings.show_trash}
	<!-- deleted tasks -->
	{#each $deleted as task (task.task_id)}
		<div class="box">
			<TaskItem {task} />
		</div>
	{/each}
{:else if no_tasks}
	<p class="notification is-success">The task list is empty</p>
{:else if all_finished}
	<p class="notification is-success">All tasks are finished!</p>
{:else}
	<!-- not deleted tasks -->
	{#each $settings.reverse_list ? reverse($tasks) : $tasks as task (task.task_id)}
		{#if !task.finished || $settings.show_finished}
			<!-- filter out finished (if finished tasks hidden) -->
			<div class="box">
				<TaskItem {task} />
			</div>
		{/if}
	{/each}
{/if}
