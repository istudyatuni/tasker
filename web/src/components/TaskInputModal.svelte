<script context="module">
	import { SendNewTask } from 'src/api/CreateTask.js'
	import { UpdateTask } from 'src/api/UpdateTask.js'

	import TextInput from 'src/components/blocks/TextInput.svelte'
	import DropdownTextInput from 'src/components/blocks/DropdownTextInput.svelte'

	import { settings } from 'src/stores/settings.js'
	import { subjects } from 'src/stores/tasks.js'

	import { edit } from 'src/utils/editor.js'
	import { placeholders } from 'src/utils/objects.js'

	// should return true to close modal
	const submitters = {
		close: () => true,
		create: SendNewTask,
		edit: UpdateTask,
	}

	function close() {
		edit('close')
	}
</script>

<script>
	$: is_active = $settings.editor.state !== 'close'

	$: submitter = submitters[$settings.editor.state]
	$: task = $settings.editor.task

	async function submit() {
		if (!task.name) return

		const result = await submitter(task)
		if (result === true) {
			close()
		}
	}
</script>

<div class="modal" class:is-active={is_active}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Task editor</p>
		</header>
		<section class="modal-card-body">
			<TextInput
				label="Name"
				placeholder={placeholders.name}
				bind:value={task.name}
				required />
			<TextInput
				label="Full name"
				placeholder={placeholders.full_name}
				bind:value={task.full_name} />
			<DropdownTextInput
				label="Subject"
				placeholder={placeholders.subject}
				bind:value={task.subject}
				dropdown={$subjects} />
			<TextInput
				label="Description"
				placeholder={placeholders.description}
				bind:value={task.description} />
			<TextInput
				label="Detailed description"
				placeholder={placeholders.other_text}
				bind:value={task.other_text}
				big_text
				markdown>
				<span class="icon" slot="after-label">
					<img src="icons/markdown.svg" title="Markdown is supported" alt="" />
				</span>
			</TextInput>
		</section>
		<footer class="modal-card-foot is-flex is-justify-content-flex-end">
			<button class="button" on:click={close}>Cancel</button>
			<button class="button is-success" disabled={!task.name} on:click={submit}
				>Save changes</button>
		</footer>
	</div>
</div>
