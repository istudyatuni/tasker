<script>
	import TaskInputModal from 'src/components/TaskInputModal.svelte'

	import { settings } from 'src/stores/settings.js'

	function toggleSetting(key) {
		settings.set(key, !$settings[key])
	}

	const saveStrictLB = $settings.strict_line_breaks

	let opened = false, show_reload = false;

	function toggleReload() {
		show_reload = !show_reload
	}
</script>

<div class="is-flex is-justify-content-space-between">
	<button class="button is-primary is-inverted block"
		on:click={() => { opened = !opened }}
	>
		<span class="icon is-not-focused">
			<img src="icons/settings-gear.svg" alt="">
		</span>
		<span>Settings</span>
	</button>

	<TaskInputModal>
		<button slot="trigger" class="button is-primary block">Add a task</button>
	</TaskInputModal>
</div>

{#if opened}
	<label class="checkbox block">
		<input
			type="checkbox" name="show_finished"
			checked={$settings.show_finished}
			on:click={() => { toggleSetting('show_finished') }}>
		Show finished
	</label>

	<br>

	<div class="block">
		<label class="checkbox" title="Ignore single line breaks according to the markdown specs">
			<input
				type="checkbox" name="strict_line_breaks"
				checked={$settings.strict_line_breaks}
				on:click={() => { toggleSetting('strict_line_breaks'); toggleReload() }}>
			Strict line breaks
		</label>

		{#if show_reload}
			<span class="icon is-clickable"
				title="Reload page to apply"
				on:click={() => {
					window.location.reload()
				}}>
				<img src="icons/reload-circle.svg" alt="">
			</span>
		{/if}

	</div>
{/if}
