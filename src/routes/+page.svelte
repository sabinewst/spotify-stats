<script lang="ts">
	import { PUBLIC_REDIRECT_URI } from '$env/static/public';
	import Login from '$lib/components/Login.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import { token } from '$lib/stores/stores';
	import { onMount } from 'svelte';

	const getDataFromUrl = () => {
		return window.location.hash
			.substring(1)
			.split('&')
			.reduce((initial: { [key: string]: string }, item: string) => {
				const parts = item.split('=');
				initial[parts[0]] = decodeURIComponent(parts[1]);

				return initial;
			}, {});
	};

	onMount(() => {
		if (!$token) {
			const data = getDataFromUrl();
			if (data.access_token) {
				token.set(data.access_token);
			}

			// reset url in browser window
			window.history.pushState({}, '', PUBLIC_REDIRECT_URI);
		}
	});
</script>

{#if !$token}
	<p>
		Don't want to wait until the end of the year to find out which artists and tracks you've been
		listening to the most? You've come to the right place.
	</p>

	<Login />
{:else}
	<Stats />
{/if}

<style>
	p {
		margin-bottom: 32px;
	}
</style>
