<script context="module">
	import { SendNewTask } from 'src/api/CreateTask.js'
	import { UpdateTask } from 'src/api/UpdateTask.js'

	import TextInput from 'src/components/blocks/TextInput.svelte'
	import DropdownTextInput from 'src/components/blocks/DropdownTextInput.svelte'

	import { settings } from 'src/stores/settings.js'
	import { tasks } from 'src/stores/tasks.js'

	import { edit } from 'src/utils/editor.js'
	import { defaultTask, placeholders } from 'src/utils/objects.js'
	import { getSubjects } from 'src/utils/tasks.js'

	// should return true to close modal
	const submitters = {
		close: (task) => true,
		create: SendNewTask,
		edit: UpdateTask
	}

	function close() { edit('close') }
</script>

<script>
	$: submitter = submitters[$settings.editor.state]
	$: task = $settings.editor.task
	$: subjects = getSubjects($tasks)

	async function submit() {
		const result = await submitter(task)
		if (result === true) {
			close()
		}
	}
</script>

<div class="modal" class:is-active={$settings.editor.state !== 'close'}>
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Task editor</p>
		</header>
		<section class="modal-card-body">

			<TextInput label="Name" placeholder={placeholders.name}
				bind:value={task.name} required />
			<TextInput label="Full name" placeholder={placeholders.full_name}
				bind:value={task.full_name} />
			<DropdownTextInput label="Subject" placeholder={placeholders.subject}
				bind:value={task.subject} dropdown={subjects} />
			<TextInput label="Description" placeholder={placeholders.description}
				bind:value={task.description} />
			<TextInput label="Detailed description" placeholder={placeholders.other_text}
				bind:value={task.other_text} big_text>
				<span class="icon" slot="after-label">
					<img src="icons/markdown.svg" title="Markdown is supported" alt="">
				</span>
			</TextInput>

		</section>
		<footer class="modal-card-foot is-flex is-justify-content-flex-end">
			<button class="button" on:click={close}>Cancel</button>
			<button class="button is-success" on:click={submit}>Save changes</button>
		</footer>
	</div>
</div>
