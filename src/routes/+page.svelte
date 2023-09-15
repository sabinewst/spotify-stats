<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import { token } from '$lib/stores/stores';
	import { onMount } from 'svelte';

	export let data;

	const getCodeAndRequestToken = () => {
		const urlParams = new URLSearchParams(window.location.search);
		let code = urlParams.get('code') || '';
		let codeVerifier = localStorage.getItem('code_verifier') || '';

		let body = new URLSearchParams({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: data.redirectUri,
			client_id: data.clientId,
			code_verifier: codeVerifier
		});

		fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response.json();
			})
			.then((data) => {
				localStorage.setItem('access_token', data.access_token);
				$token = data.access_token;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	onMount(() => {
		const localToken = localStorage.getItem('access_token');
		if (!$token && localToken) {
			$token = localToken;
		}
		if (!$token && localStorage.getItem('code_verifier')) {
			getCodeAndRequestToken();
			// reset url in browser window
			window.history.pushState({}, '', data.redirectUri);
		}
	});
</script>

{#if !$token}
	<p>
		Don't want to wait until the end of the year to find out which artists and tracks you've been
		listening to the most? You've come to the right place.
	</p>

	<Login clientId={data.clientId} redirectUri={data.redirectUri} />
{:else}
	<Stats />
{/if}

<style>
	p {
		margin-bottom: 32px;
	}
</style>
