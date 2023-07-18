<script lang="ts">
	export let clientId;
	export let redirectUri;

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
		client_id: clientId,
		scope,
		redirect_uri: redirectUri,
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
