<script>
	import Modal from '$lib/Modal.svelte';
	import Icon from '@iconify/svelte';

	let showModal = false;
</script>

<header>
	<button class="info" type="button" title="About this app" on:click={() => (showModal = true)}>
		<Icon icon="mdi:information-slab-circle-outline" />
	</button>

	<Modal bind:showModal>
		<h2 slot="header">About this app</h2>

		<p>
			Spotify Stats was built with <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a
			>.<br />
			It uses Spotify's Web API to access your Spotify user data, giving you insights into your top played
			tracks and artists. Your personal data will neither be stored nor utilized for any other purposes.
		</p>
	</Modal>
</header>

<main>
	<div class="card">
		<slot />
	</div>
</main>

<style>
	:global(body) {
		background-color: black;
		color: white;
		margin: 0;
	}

	main {
		font-family: 'Courier New', Courier, monospace;
		text-align: center;
	}

	.card {
		border: 3px dotted greenyellow;
		border-radius: 4px;
		max-width: 70%;
		margin: 100px auto;
		padding: 32px;
	}

	.info {
		background-color: transparent;
		border: 0;
		color: greenyellow;
		cursor: pointer;
		font-size: 2em;
		position: absolute;
		right: 8px;
		top: 8px;
	}
</style>
