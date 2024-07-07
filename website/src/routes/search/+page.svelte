<script>
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	// export let form;

	let bandName = '';
	
	const toDashCase = (text) => {
		const list = text.split(' ');
		const lowerCaseList = list.map((word) => word.toLowerCase());
		return lowerCaseList.join('-');
	}

	const searchForBand = () => {
		const bandNameDashCase = toDashCase(bandName);
		goto(`/search?band=${bandNameDashCase}`);
	}

</script>

<h1>Bands search</h1>

<input bind:value={bandName} placeholder="Enter band name" />
<button on:click={searchForBand}>Search</button>

{#await data}
	<p>Loading bands...</p>
{:then data}
	{#if data.attractions.length}
		<ul>
			{#each data.attractions as attraction}
				<li>
					<form method="POST" action="?/addBand">
						<button type="submit">Add band</button>
						<span>{attraction.name}</span>
						<input name="name" value={attraction.name} style="display: none;" />
						<input name="id" value={attraction.id} style="display: none;" />
						<input name="url" value={attraction.url} style="display: none;" />
					</form>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No results</p>
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}