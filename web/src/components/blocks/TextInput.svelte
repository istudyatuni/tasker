<script context="module">
	import SettingCheckbox from 'src/components/blocks/SettingCheckbox.svelte'

	import { turndown } from 'src/utils/turndown'
</script>

<script>
	export let label,
		placeholder,
		value,
		big_text = false, // use textarea
		required = false,
		markdown = false

	let convert_html = true

	function onPaste(e) {
		if (!convert_html || !markdown || !e.clipboardData) {
			return
		}

		e.preventDefault()
		const data = e.clipboardData.getData('text/html')

		if (data) {
			// no break space
			value = turndown(data).replace(/ /g, ' ')
		} else {
			value = e.clipboardData.getData('text')
		}
	}
</script>

<div class="field">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class:required>
			{label}
			<slot name="after-label" />
		</span>
		{#if big_text}
			<textarea
				class="textarea control"
				{placeholder}
				bind:value
				on:paste={onPaste} />

			{#if markdown}
				<SettingCheckbox text="Convert HTML" bind:checked={convert_html} />
			{/if}
		{:else}
			<input class="input control" type="text" {placeholder} bind:value />
		{/if}
	</label>
</div>

<style>
	.required:after {
		content: ' *';
		color: red;
	}
</style>
