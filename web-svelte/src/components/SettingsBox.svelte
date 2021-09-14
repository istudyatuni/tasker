<script>
	import { settings } from 'src/stores/settings.js'

	if ($settings.show_finished === undefined) {
		settings.set('show_finished', true)
	}

	function toggleFinished() {
		const current = $settings.show_finished
		settings.set('show_finished', !current)
	}
</script>

<label class="checkbox block">
	<input
		type="checkbox"
		name="show_finished"
		checked={$settings.show_finished}
		on:click={toggleFinished}
	>
	Show finished
</label>
