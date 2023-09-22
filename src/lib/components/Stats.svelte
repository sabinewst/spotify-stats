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
				$token = '';
				localStorage.removeItem('access_token');
			}
		}
	}

	onMount(getUser);
</script>

{#if username}
	<h2>Hello {username}!</h2>
{/if}
<p>
	Here's an overview of your 10 most played tracks and artists during the period of time you've
	selected. Do you want to discover similar tracks? <a href="/recommendations"
		>Check out your personal recommendations.</a
	>
</p>

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
	<TopPlayed category="tracks" {period} />
	<hr />
	<TopPlayed category="artists" {period} />
{/key}

<style>
	h2,
	a {
		color: greenyellow;
	}

	hr {
		margin-bottom: 50px;
		max-width: 70%;
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

	p {
		margin-bottom: 64px;
	}
</style>
