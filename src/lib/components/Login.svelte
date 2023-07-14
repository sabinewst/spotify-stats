<script lang="ts">
	import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

	const generateRandomString = (length: number) => {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

	const state = generateRandomString(16);
	const scope = 'user-read-private user-read-email user-top-read';
	const url = new URL('https://accounts.spotify.com/authorize?');
	const params = new URLSearchParams({
		response_type: 'token',
		client_id: PUBLIC_CLIENT_ID,
		scope,
		redirect_uri: PUBLIC_REDIRECT_URI,
		state
	}).toString();

	const loginLink = url + params;
</script>

<a href={loginLink} class="connect">Connect to Spotify</a>

<style>
	.connect {
		background-color: greenyellow;
		border-radius: 8px;
		color: black;
		font-size: 1.5em;
		margin: 24px;
		padding: 4px 8px;
		text-decoration: none;
	}
</style>
