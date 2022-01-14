<script context="module">
	import { DeleteTask } from 'src/api/DeleteTask.js'
</script>

<script>
	export let task = {}

	let trashActionColor = task.deleted ? 'success' : 'danger'
	let trashActionText = task.deleted ? 'Restore' : 'Delete to trash'

	// toggle modal

	let opened = false

	function toggleOpen() {
		opened = !opened
	}
	function closeOpened() {
		opened = false
	}

	// handlers

	function onTrash() {
		DeleteTask(task.task_id, !task.deleted, true)
	}
	function onForever() {
		DeleteTask(task.task_id, true, false)
	}
</script>

<div
	class="dropdown is-right"
	class:is-active={opened}
	on:mouseleave={closeOpened}>
	<div
		class="dropdown-trigger"
		class:red={opened}
		on:click|stopPropagation={toggleOpen}
		role="button"
		tabindex="0"
		aria-haspopup="true"
		aria-controls="dropdown-menu">
		<!-- https://icones.js.org/collection/mdi?s=trash -->
		<svg width="30" height="30" viewBox="0 0 24 24">
			<path
				d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8z" />
		</svg>
	</div>
	<div
		class="dropdown-menu"
		id="dropdown-menu4"
		role="menu"
		on:click|stopPropagation>
		<div class="dropdown-content">
			<div class="dropdown-item">
				<button
					class="button is-{trashActionColor} is-light"
					on:click|stopPropagation={onTrash}>
					{trashActionText}
				</button>
			</div>

			<div class="dropdown-item">
				<button class="button is-danger" on:click|stopPropagation={onForever}>
					Delete forever
				</button>
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
	.dropdown-trigger {
		cursor: pointer;
	}
	.red,
	.dropdown-trigger:hover {
		fill: red;
	}
</style>
