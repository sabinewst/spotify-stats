<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '@iconify/svelte';

	let showModal = false;
</script>

<header>
	<h1>Spotify Stats 🎧</h1>
	<button class="info" type="button" title="About this app" on:click={() => (showModal = true)}>
		<Icon icon="mdi:information-slab-circle-outline" />
	</button>

	<Modal bind:showModal>
		<h2 slot="header">About this app</h2>

		<p>
			Spotify Stats was built with <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a
			>.<br />
			It uses Spotify's Web API to access your Spotify user data, giving you insight into your top played
			tracks and artists, plus giving you recommendations based on your top tracks. Your personal data
			will neither be stored nor utilized for any other purposes.
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
		background-color: rgb(17, 18, 21);
		color: white;
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
	}

	:global(li) {
		list-style-type: none;
		margin-bottom: 48px;
	}

	:global(ol) {
		padding: 0;
	}

	:global(img) {
		max-width: 200px;
	}

	:global(.loader) {
		display: flex;
		justify-content: center;
	}

	h1 {
		margin-top: 50px;
		text-align: center;
	}

	main {
		text-align: center;
	}

	.card {
		border: 3px dotted greenyellow;
		border-radius: 4px;
		max-width: 70%;
		margin: 50px auto;
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
