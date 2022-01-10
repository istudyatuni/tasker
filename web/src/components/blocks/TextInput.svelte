<script>
	export let label,
		placeholder,
		value,
		big_text = false, // use textarea
		required = false
</script>

<div class="field">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class:required>
			{label}
			<slot name="after-label" />
		</span>
		{#if big_text}
			<textarea class="textarea control" {placeholder} bind:value />
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
