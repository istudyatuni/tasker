<script>
	import TextInput from 'src/components/blocks/TextInput.svelte'

	export let task = {
		name: '',
		full_name: '',
		subject: '',
		description: '',
		other_text: '',
	};

	// should return true to close modal
	export let submitter = (task) => {};

	const placeholders = {
		name: 'JS and CSS',
		full_name: 'Самостоятельная работа №1',
		subject: 'Информационные сети',
		description: 'Лабораторное занятие 01.01.1970',
		other_text: 'Например, список названий лекций'
	}

	let modal_root = null

	function toggleOpen() {
		modal_root.classList.toggle('is-active')
	}
</script>

<div on:click={toggleOpen}>
	<slot name="trigger"></slot>
</div>

<div class="modal" bind:this={modal_root}>
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Task editor</p>
		</header>
		<section class="modal-card-body">

			<TextInput label="Name" placeholder={placeholders.name}
				bind:value={task.name} />
			<TextInput label="Full name" placeholder={placeholders.full_name}
				bind:value={task.full_name} />
			<TextInput label="Subject" placeholder={placeholders.subject}
				bind:value={task.subject} />
			<TextInput label="Description" placeholder={placeholders.description}
				bind:value={task.description} />
			<TextInput label="Detailed description" placeholder={placeholders.other_text}
				bind:value={task.other_text} big_text />

		</section>
		<footer class="modal-card-foot is-flex is-justify-content-flex-end">
			<button class="button" on:click={toggleOpen}>Cancel</button>
			<button class="button is-success"
				on:click={async () => {
					const result = await submitter(task)
					if (result === true) {
						toggleOpen()
					}
				}}>Save changes</button>
		</footer>
	</div>
</div>
