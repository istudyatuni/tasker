<script>
	import { tasks } from 'src/stores/tasks.js'
	import { FinishTask } from 'src/api/FinishTask.js'
</script>

{#if $tasks.length === 0}
	<p class="notification is-success">Tasks list is empty</p>
{/if}

{#each $tasks as task}
	<div class="box">
		<!-- header -->
		<div class="is-flex">
			<img
				src={`icons/${task.finished ? '' : 'in'}completed-task.svg`}
				on:click={() => {
					FinishTask(task.task_id, !task.finished)
				}}
				class="icon mr-3 pt-1 is-clickable"
				width="50" height="50" alt=""
			>
			<div>
				<p class="title is-5">{task.name}</p>
				<p class="subtitle">{task.description}</p>
			</div>
		</div>
	</div>
{/each}
