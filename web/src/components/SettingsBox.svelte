<script context="module">
	import SettingCheckbox from 'src/components/blocks/SettingCheckbox.svelte'
	import ImportExport from 'src/components/ImportExport.svelte'

	import { settings } from 'src/stores/settings.js'

	import { edit } from 'src/utils/editor.js'

	function editCreate() {
		edit('create')
	}
</script>

<script>
	let opened = false,
		show_reload = false

	function toggleReload() {
		show_reload = !show_reload
	}
	function toggleTrash() {
		$settings.show_trash = !$settings.show_trash
	}
	function toggleOpen() {
		opened = !opened
	}
</script>

<div class="is-flex is-justify-content-space-between">
	<div>
		<button class="button is-primary is-inverted block" on:click={toggleOpen}>
			<span class="icon is-not-focused">
				<img src="icons/settings-gear.svg" alt="" />
			</span>
			<span>Settings</span>
			{#if show_reload}
				<span
					class="icon is-clickable"
					title="Reload page to apply"
					on:click={window.location.reload}
				>
					<img src="icons/reload-circle.svg" alt="reload" />
				</span>
			{/if}
		</button>

		<button
			class="ml-5 button is-danger block"
			class:is-inverted={!$settings.show_trash}
			on:click={toggleTrash}
		>
			Trash
		</button>
	</div>

	<button class="button is-primary block" on:click={editCreate}>
		Add a task
	</button>
</div>

{#if opened}
	<div class="is-flex is-justify-content-space-between">
		<div>
			{#if !$settings.show_trash}
				<SettingCheckbox
					text="Reverse list"
					name="reverse_list"
					bind:checked={$settings.reverse_list}
				/>

				<SettingCheckbox
					text="Show finished"
					name="show_finished"
					bind:checked={$settings.show_finished}
				/>
			{/if}

			<SettingCheckbox
				text="Strict line breaks"
				name="strict_line_breaks"
				help="Ignore single line breaks in detailed description according to the markdown specs"
				bind:checked={$settings.strict_line_breaks}
				on:change={toggleReload}
			/>
		</div>

		{#if $settings.offline === 'none'}
			<ImportExport />
		{/if}
	</div>
{/if}
