<script>
	export let checked,
		name = '',
		text = '',
		help = ''
</script>

<label class="checkbox block">
	<input bind:checked on:change type="checkbox" {name} />
	{text}
	<p class="help">{help}</p>
</label>

<br />
