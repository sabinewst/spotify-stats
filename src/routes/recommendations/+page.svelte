<script lang="ts">
	import { onMount } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';

	interface RecommendationItem {
		name: string;
		artists: {
			name: string;
		}[];
		album: {
			images: {
				url: string;
			}[];
		};
		external_urls: {
			spotify: string;
		};
	}

	let recommendations: RecommendationItem[] = [];
	let token: string;

	async function getRecommendations() {
		recommendations = [];
		const url = new URL(`https://api.spotify.com/v1/recommendations?`);
		const params = new URLSearchParams({
			seed_tracks: localStorage.getItem('seedTracks') || '',
			min_popularity: '60'
		}).toString();

		token = localStorage.getItem('access_token') || '';
		if (token) {
			const res = await fetch(url + params, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			});

			if (res.ok) {
				const data = await res.json();
				setTimeout(() => {
					recommendations = data.tracks;
				}, 500);
			} else {
				token = '';
				console.log(res);
			}
		}
	}

	onMount(getRecommendations);
</script>

<a href="/">Back to overview</a>
{#if token}
	<p>
		Here are some tracks you might enjoy as well. These recommendations are based on your top
		tracks.
	</p>
{:else}
	<p>Oops, something went wrong. Please go back and try again.</p>
{/if}

{#if recommendations && recommendations.length}
	<button class="refresh" on:click={() => getRecommendations()}>Get new recommendations!</button>
	<ol>
		{#each recommendations as item}
			<li>
				<h3>{item.name}</h3>
				<p>{item.artists[0].name}</p>
				<a href={item.external_urls.spotify} target="_blank">
					<img src={item.album.images[0].url} alt={item.name} />
				</a>
			</li>
		{/each}
	</ol>
{:else}
	<div class="loader">
		<SyncLoader color="white" duration="0.7s" />
	</div>
{/if}

<style>
	a {
		color: greenyellow;
	}

	p {
		margin-bottom: 32px;
	}

	.loader {
		display: flex;
		justify-content: center;
	}

	.refresh {
		background-color: greenyellow;
		border-radius: 8px;
		color: black;
		cursor: pointer;
		font-family: 'Courier New', Courier, monospace;
		font-size: 1em;
		margin-bottom: 24px;
	}
</style>
