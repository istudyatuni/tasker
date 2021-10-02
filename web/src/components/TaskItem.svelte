<script context="module">
	import marked from 'marked'

	import { FinishTask } from 'src/api/FinishTask.js'

	import TaskInputModal from 'src/components/TaskInputModal.svelte'

	import { settings } from 'src/stores/settings.js'

	import { edit } from 'src/utils/editor.js'
	import { scriptSanitize } from 'src/utils/sanitize.js'
</script>

<script>
	export let task

	let markedOptions = {
		breaks: !$settings.strict_line_breaks,
	}

	let opened = false

	function toggleDetails() {
		opened = !opened
	}
</script>

<!-- header -->
<div class="is-flex is-clickable" on:click={toggleDetails}>
	<img
		src={`icons/${task.finished ? '' : 'in'}completed-task.svg`}
		on:click|stopPropagation={() => {
			FinishTask(task.task_id, !task.finished)
		}}
		class="icon mr-4 pt-1 is-clickable"
		width="50"
		height="50"
		alt=""
		title="Finish task"
	/>
	<div title="Open details">
		<p class="title is-5">{task.name}</p>
		<p class="subtitle">{task.description}</p>
	</div>
</div>

<!-- details -->
{#if opened}
	<div class="is-flex is-justify-content-space-between mt-5">
		<div>
			<p class="title is-4">{task.full_name}</p>
			<p class="subtitle">{task.subject}</p>
		</div>

		<button class="button" on:click={() => edit('edit', task.task_id)}
			>Edit</button
		>
	</div>
	<hr class:is-hidden={task.other_text === ''} />
	<div class="content">
		{@html scriptSanitize(marked(task.other_text, markedOptions))}
	</div>
{/if}
