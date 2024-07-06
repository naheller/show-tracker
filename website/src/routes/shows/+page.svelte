<script>
	export let data;
</script>

<h1>shows</h1>

{#if data.shows.length}
	<ul>
		{#each data.shows as show}
			<li>{new Date(show.datetime_utc).toLocaleString()} - <a href={show.page_url_tm} target="_blank">{show.name}</a></li>
		{/each}
	</ul>
{:else}
	<p>No shows</p>
{/if}