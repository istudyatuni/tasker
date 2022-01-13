<script context="module">
	import { settings } from 'src/stores/settings.js'
	import { filtered as tasks } from 'src/stores/tasks.js'
</script>

<script>
	// except deleted
	$: finished = $tasks.filter((t) => t.finished && !t.deleted).length
	$: total = $tasks.filter((t) => !t.deleted).length
	$: finished_percent = Math.round((finished * 100) / total)

	$: deleted = $tasks.filter((t) => t.deleted).length
</script>

{#if !$settings.show_trash}
	<p class="block">
		Finished
		{#if total !== 0}
			{finished}/{total} ({finished_percent}%)
		{:else}
			0
		{/if}

		{#if $settings.filterSubject}
			, filtered by "{$settings.filterSubject}"
		{/if}
	</p>
{:else}
	<p class="block">Deleted {deleted}</p>
{/if}
