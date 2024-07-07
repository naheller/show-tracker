<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>My shows</h1>

{#await data}
	<p>Loading shows...</p>
{:then data}
	<ul>
		{#each data.shows as show}
		<li>{new Date(show.datetime_utc).toLocaleString()} - <a href={show.page_url_tm} target="_blank">{show.name}</a></li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}