<script>
	import { tasks } from 'src/stores/tasks.js'

	import TaskItem from 'src/components/TaskItem.svelte'
</script>

{#if $tasks.length === 0}
	<p class="notification is-success">Tasks list is empty</p>
{/if}

{#each $tasks as task}
	<div class="box">
		<TaskItem {task} />
	</div>
{/each}
