<script>
	import { SendNewTask } from 'src/api/CreateTask.js'

	import SettingCheckbox from 'src/components/blocks/SettingCheckbox.svelte'
	import TaskInputModal from 'src/components/TaskInputModal.svelte'
	import ImportExport from 'src/components/ImportExport.svelte'

	import { settings } from 'src/stores/settings.js'

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
		<div>
			<SettingCheckbox text="Show finished" name="show_finished"
				bind:checked={$settings.show_finished} />

			<SettingCheckbox text="Strict line breaks" name="strict_line_breaks"
				help="Ignore single line breaks in detailed description according to the markdown specs"
				bind:checked={$settings.strict_line_breaks}
				on:change={toggleReload} />

			<SettingCheckbox text="Open links in new tab" name="link_target_blank"
				bind:checked={$settings.link_target_blank}
				on:change={toggleReload} />
		</div>

		<ImportExport />
	</div>
{/if}
