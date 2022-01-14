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
	$: no_tasks =
		$tasks.length === 0 ||
		(!$settings.show_trash && $tasks.every((task) => task.deleted))

	// all tasks finished and finished tasks hidden
	$: all_finished =
		!$settings.show_finished && $tasks.every((task) => task.finished)
</script>

{#if no_tasks}
	<p class="notification is-success">The task list is empty</p>
{:else if all_finished}
	<p class="notification is-success">All tasks are finished!</p>
{:else if $settings.show_trash}
	<!-- show deleted -->
	{#each $deleted as task (task.task_id)}
		<div class="box">
			<TaskItem {task} />
		</div>
	{/each}
{:else}
	<!-- show tasks -->
	{#each $settings.reverse_list ? reverse($tasks) : $tasks as task (task.task_id)}
		{#if !task.deleted && (!task.finished || $settings.show_finished)}
			<!-- filter out deleted and finished (if finished tasks hidden) -->
			<div class="box">
				<TaskItem {task} />
			</div>
		{/if}
	{/each}
{/if}
