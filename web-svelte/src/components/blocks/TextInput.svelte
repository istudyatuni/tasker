<script>
	export let
		label, placeholder, value,
		big_text = false // use textarea
</script>

<div class="field">
	{#if !big_text}
		<label class="label">{label}
			<input class="input control" type="text" placeholder={placeholder} bind:value>
		</label>
	{:else}
		<label class="label">{label}
			<textarea class="textarea control" placeholder={placeholder} bind:value></textarea>
		</label>
	{/if}
</div>
