<script>
	import { SendNewTask } from 'src/api/CreateTask.js'

	import TaskInputModal from 'src/components/TaskInputModal.svelte'
	import ImportExport from 'src/components/ImportExport.svelte'

	import { settings } from 'src/stores/settings.js'

	function toggleSetting(key) {
		settings.set(key, !$settings[key])
	}

	let opened = false, show_reload = false;

	function toggleReload() {
		show_reload = !show_reload
	}
</script>

<div class="is-flex is-justify-content-space-between">
	<button class="button is-primary is-inverted block"
		on:click={() => { opened = !opened }}>
		<span class="icon is-not-focused">
			<img src="icons/settings-gear.svg" alt="">
		</span>
		<span>Settings</span>
		{#if show_reload}
			<span class="icon is-clickable"
				title="Reload page to apply"
				on:click={() => {
					window.location.reload()
				}}>
				<img src="icons/reload-circle.svg" alt="">
			</span>
		{/if}
	</button>

	<TaskInputModal submitter={SendNewTask}>
		<button slot="trigger" class="button is-primary block">Add a task</button>
	</TaskInputModal>
</div>

{#if opened}
	<div class="is-flex is-justify-content-space-between">
		<div class="block">
			<label class="checkbox block">
				<input
					type="checkbox" name="show_finished"
					checked={$settings.show_finished}
					on:click={() => { toggleSetting('show_finished') }}>
				Show finished
			</label>

			<br>

			<label class="checkbox block">
				<input
					type="checkbox" name="strict_line_breaks"
					checked={$settings.strict_line_breaks}
					on:click={() => { toggleSetting('strict_line_breaks'); toggleReload() }}>
				Strict line breaks
				<p class="help">Ignore single line breaks in detailed description according to the markdown specs</p>
			</label>
		</div>

		<ImportExport />
	</div>
{/if}
