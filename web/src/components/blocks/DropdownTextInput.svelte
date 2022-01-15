<script>
	export let label,
		value,
		placeholder,
		dropdown = [],
		required = false,
		show_clear = false

	let opened = false
	function open() {
		opened = !opened
	}
	function clear() {
		value = ''
	}
</script>

<div class="field">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class:required>
			{label}
			<slot name="after-label" />
		</span>

		<div class="control has-icons-right">
			<input bind:value {placeholder} class="input control" type="text" />

			{#if value && show_clear}
				<!-- clear -->
				<!-- by default, when you click on block with input, this input
					is focused, so we prevent it -->
				<span
					on:click|preventDefault={clear}
					class="icon is-small is-left is-clickable"
					role="button">
					<img src="icons/clear.svg" width="15px" height="15px" alt="" />
				</span>
			{/if}

			<span
				on:click={open}
				class="icon is-small is-right is-clickable"
				style:transform={opened ? 'rotate(180deg)' : 'none'}
				role="button">
				<img src="icons/arrow-down.svg" width="10px" height="10px" alt="" />
			</span>
		</div>

		<div class="dropdown" class:is-active={opened}>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content">
					{#each dropdown as item}
						<!-- svelte-ignore a11y-missing-attribute -->
						<a
							on:click|preventDefault={() => {
								value = item
								opened = false
							}}
							class:is-active={item === value}
							class="dropdown-item">
							{item}
						</a>
					{:else}
						<div class="dropdown-item">No subjects</div>
					{/each}
				</div>
			</div>
		</div>
	</label>
</div>

<style>
	.required:after {
		content: ' *';
		color: red;
	}
</style>
