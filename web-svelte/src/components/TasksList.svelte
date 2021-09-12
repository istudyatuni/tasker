<script>
	export let tasks;
</script>

{#each tasks as task}
	<div class="box">
		<!-- header -->
		<div class="is-flex">
			<img
				src={`icons/${task.finished ? '' : 'in'}completed-task.svg`}
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
