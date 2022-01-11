<script context="module">
	import { DeleteTask } from 'src/api/DeleteTask.js'
</script>

<script>
	export let task
</script>

<div class="dropdown is-right is-hoverable">
	<div class="dropdown-trigger" on:click|stopPropagation>
		<!-- https://icones.js.org/collection/mdi?s=trash -->
		<svg class="has-text-danger" width="30" height="30" viewBox="0 0 24 24">
			<path
				d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8z"
				fill="currentColor"
			/>
		</svg>
	</div>
	<div
		class="dropdown-menu"
		id="dropdown-menu4"
		role="menu"
		on:click|stopPropagation
	>
		<div class="dropdown-content">
			<div class="dropdown-item">
				<button
					class="button is-{task.deleted ? 'success' : 'danger'} is-light"
					on:click|stopPropagation={() => {
						DeleteTask(task.task_id, !task.deleted, true)
					}}>{task.deleted ? 'Restore' : 'Delete to trash'}</button
				>
			</div>

			<div class="dropdown-item">
				<button
					class="button is-danger"
					on:click|stopPropagation={() => DeleteTask(task.task_id, true, false)}
					>Delete forever</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	button {
		width: 100%;
	}
	.dropdown {
		cursor: auto;
	}
</style>
