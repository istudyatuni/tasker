<script>
	import { notifications } from 'src/stores/notifications.js'
</script>

<div class="wrapper">
	{#each $notifications as note}
		<div class="notification is-{note.level}">
			<button class="delete"
				on:click={() => notifications.pop()}></button>
			{note.message}
		</div>
	{/each}
</div>

<style>
	.notification {
		position: fixed;
		bottom: 1em;
		right: 1em;
		z-index: 40;
	}
</style>
