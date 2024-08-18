<script>
	/** @type {import('./$types').PageData} */
	export let data;

	let showArchived = false;

	$: filteredShows = (data?.shows || []).filter(show => (
		showArchived ? show.archived : !show.archived
	))

	const toggleShowArchived = () => {
		showArchived = !showArchived;
	}
</script>

<h1>My shows</h1>
<p>{showArchived ? 'Showing archived shows' : 'Showing unarchived shows'}</p>
<button on:click={toggleShowArchived}>
	{showArchived ? 'Show unarchived' : 'Show archived'}
</button>

{#await data}
	<p>Loading shows...</p>
{:then data}
	<ul>
		{#each filteredShows as show}
			<form method="POST" action="?/archiveShow">
				<li>
					<button type="submit">{showArchived ? 'Unarchive' : 'Archive'}</button>
					<span>{new Date(show.datetime_utc).toLocaleString("en-US")} at {show.venue_name} - <a href={show.page_url_tm} target="_blank">{show.name}</a></span>
				</li>
				<input name="idTm" value={show.id_tm} style="display: none;" />
				<input name="archived" value={showArchived ? false : true} style="display: none;" />
			</form>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}