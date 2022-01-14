<script context="module">
	import { settings } from 'src/stores/settings.js'
	import { filtered as tasks, deleted } from 'src/stores/tasks.js'
</script>

<script>
	$: finished = $tasks.filter((t) => t.finished).length
	$: total = $tasks.length
	$: finished_percent = Math.round((finished * 100) / total)
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
	<p class="block">Deleted {$deleted.length}</p>
{/if}
