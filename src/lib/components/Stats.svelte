<script lang="ts">
	let period = 'medium_term';
</script>

<h2>Welcome!</h2>

<fieldset>
	<legend>Select period of time</legend>
	<label>
		<input type="radio" bind:group={period} name="period" value={'short_term'} />
		Short (the last 4 weeks)
	</label>

	<label>
		<input type="radio" bind:group={period} name="period" value={'medium_term'} />
		Medium (the last 6 months)
	</label>

	<label>
		<input type="radio" bind:group={period} name="period" value={'long_term'} />
		Long (the last several years)
	</label>
</fieldset>

<h2>Top artists</h2>

<h2>Top tracks</h2>

<style>
	fieldset {
		display: flex;
		flex-direction: column;
	}

	label {
		cursor: pointer;
	}
</style>
