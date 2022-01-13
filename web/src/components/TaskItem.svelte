<script context="module">
	import { marked } from 'marked'

	import { FinishTask } from 'src/api/FinishTask.js'

	import DeleteItem from 'src/components/DeleteItem.svelte'

	import { settings } from 'src/stores/settings.js'

	import { edit } from 'src/utils/editor.js'
	import { isOffline } from 'src/utils/offline.js'
	import { scriptSanitize } from 'src/utils/sanitize.js'
</script>

<script>
	export let task

	$: complete_icon = `icons/${task.finished ? '' : 'in'}completed-task.svg`

	let opened = false

	function toggleFinished() {
		FinishTask(task.task_id, !task.finished)
	}
	function toggleDetails() {
		opened = !opened
	}
	function onEdit() {
		edit('edit', task.task_id)
	}

	// marked

	$: markedOptions = {
		breaks: !$settings.strict_line_breaks,
	}
</script>

<!-- header -->
<div class="level is-clickable" on:click={toggleDetails} role="button">
	<div class="level-left">
		<img
			src={complete_icon}
			on:click|stopPropagation={toggleFinished}
			class="icon mr-4 pt-1 is-clickable"
			width="50"
			height="50"
			alt=""
			title="Finish task"
			role="button" />
		<div title="Open details">
			<p class="title is-5" class:completed-title={task.finished}>
				{task.name}
			</p>
			<p class="subtitle">{task.description}</p>
		</div>
	</div>

	{#if isOffline()}
		<DeleteItem {task} />
	{/if}
</div>

<!-- details -->
{#if opened}
	<div class="is-flex is-justify-content-space-between mt-5">
		<div>
			<p class="title is-4">{task.full_name}</p>
			<p class="subtitle">{task.subject}</p>
		</div>

		<button class="button" on:click={onEdit}>Edit</button>
	</div>
	<hr class:is-hidden={task.other_text === ''} />
	<div class="content">
		{@html scriptSanitize(marked.parse(task.other_text, markedOptions))}
	</div>
{/if}

<style>
	.completed-title {
		color: hsl(0, 0%, 60%);
	}
</style>
