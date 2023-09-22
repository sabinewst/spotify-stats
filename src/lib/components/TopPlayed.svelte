<script lang="ts">
	import { token } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';

	export let category: string, period: string;

	interface TopPlayedItem {
		name: string;
		image: string;
		info: string;
		url: string;
	}

	let topPlayed: TopPlayedItem[] = [];

	const transformData = (items: any): TopPlayedItem[] => {
		if (category === 'artists') {
			return items.map((item: any) => {
				return {
					name: item.name,
					image: item.images[0].url,
					info: `Genres: ${item.genres.join(', ')}`,
					url: item.external_urls.spotify
				};
			});
		} else {
			const seedTracks: string[] = [];
			const itemArray = items.map((item: any, index: number) => {
				if (index < 5) {
					seedTracks.push(item.id);
				}
				return {
					name: item.name,
					image: item.album.images[0].url,
					info: item.artists.map((artist: any) => artist.name).join(', '),
					url: item.external_urls.spotify
				};
			});
			localStorage.setItem('seedTracks', seedTracks.join());
			return itemArray;
		}
	};

	async function getTopPlayed() {
		const url = new URL(`https://api.spotify.com/v1/me/top/${category}?`);
		const params = new URLSearchParams({
			time_range: period,
			limit: '10',
			offset: '0'
		}).toString();

		if ($token) {
			const res = await fetch(url + params, {
				headers: {
					Authorization: 'Bearer ' + $token
				}
			});

			if (res.ok) {
				const data = await res.json();
				setTimeout(() => {
					topPlayed = transformData(data.items);
				}, 500);
			} else {
				$token = '';
				console.log(res);
			}
		}
	}

	onMount(getTopPlayed);
</script>

<h2>Your top {category}</h2>
{#if topPlayed.length}
	<ol>
		{#each topPlayed as item, i}
			<li>
				<h3>{i + 1}. {item.name}</h3>
				<p>{item.info}</p>
				<a href={item.url} target="_blank">
					<img src={item.image} alt={item.name} />
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
	h2 {
		color: greenyellow;
		font-size: 2em;
	}
</style>
