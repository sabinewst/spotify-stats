<script lang="ts">
	import { token } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import TopPlayed from './TopPlayed.svelte';

	let period = 'medium_term';
	let username: string;

	async function getUser() {
		if ($token) {
			const res = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + $token
				}
			});

			if (res.ok) {
				const data = await res.json();
				username = data.display_name;
			} else {
				console.log(res);
			}
		}
	}

	onMount(getUser);
</script>

{#if username}
	<h2>Hello {username}!</h2>
{/if}

<fieldset>
	<legend>Select a period of time</legend>
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

{#key period}
	<TopPlayed category="artists" {period} />
	<hr />
	<TopPlayed category="tracks" {period} />
{/key}

<style>
	h2 {
		color: greenyellow;
	}

	hr {
		margin-bottom: 50px;
		max-width: 60%;
		opacity: 0.3;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		margin-bottom: 50px;
		max-width: 500px;
	}

	label {
		cursor: pointer;
	}
</style>
