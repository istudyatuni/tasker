<script>
	export let label, value, placeholder,
	dropdown = [],
	required = false

	let opened = false
	function open() { opened = !opened }
</script>

<div class="field">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class:required>
			{label} <slot name="after-label"></slot>
		</span>

		<div class="control has-icons-right">
			<input bind:value placeholder={placeholder}
				class="input control" type="text">
			<span on:click={open} class="icon is-small is-right is-clickable">
				<img src="icons/arrow-down.svg" class:is-180-rotate={opened}
					width="10px" height="10px" alt="">
			</span>
		</div>

		<div class="dropdown" class:is-active={opened}>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content">

					{#each dropdown as item}
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click|preventDefault={() => {
							value = item; opened = false
						}} class:is-active={item === value} class="dropdown-item">
							{item}
						</a>
					{/each}

				</div>
			</div>
		</div>

	</label>
</div>

<style type="text/css">
	.required:after {
		content: ' *';
		color: red;
	}
	.is-180-rotate {
		transform: rotate(180deg);
	}
</style>
