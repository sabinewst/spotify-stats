<script lang="ts">
	import { onMount } from 'svelte';

	export let clientId: string;
	export let redirectUri: string;

	const generateRandomString = (length: number) => {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

	function base64encode(digest: ArrayBuffer) {
		const uint8Array = new Uint8Array(digest);
		const byteArray = Array.from(uint8Array);
		return btoa(String.fromCharCode.apply(null, byteArray))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}

	async function generateCodeChallenge(codeVerifier: string) {
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await window.crypto.subtle.digest('SHA-256', data);
		return base64encode(digest);
	}

	let loginLink: string;
	const codeVerifier = generateRandomString(128);

	onMount(() => {
		generateCodeChallenge(codeVerifier).then((codeChallenge) => {
			let state = generateRandomString(16);
			const scope = 'user-read-private user-read-email user-top-read';
			localStorage.setItem('code_verifier', codeVerifier);

			let args = new URLSearchParams({
				response_type: 'code',
				client_id: clientId,
				scope: scope,
				redirect_uri: redirectUri,
				state: state,
				code_challenge_method: 'S256',
				code_challenge: codeChallenge
			}).toString();

			loginLink = 'https://accounts.spotify.com/authorize?' + args;
		});
	});
</script>

<a href={loginLink} class="connect">Connect to Spotify</a>

<style>
	.connect {
		background-color: greenyellow;
		border-radius: 8px;
		color: black;
		font-size: 1.3em;
		margin: 24px;
		padding: 4px 8px;
		text-decoration: none;

		@media (max-width: 600px) {
			font-size: 1em;
			font-weight: 600;
			margin: 0;
		}
	}
</style>
