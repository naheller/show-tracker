<script>
	/** @type {import('./$types').PageData} */
	export let data;

  let showArchived = false;

  $: sortedShows = (data?.shows ? [...data?.shows] : []).sort((a, b) => (
    new Date(a.datetime_utc) - new Date(b.datetime_utc)
  ))

  $: filteredShows = sortedShows.filter(show => (
		showArchived ? show.archived : !show.archived
	))

  const toggleShowArchived = () => {
		showArchived = !showArchived;
	}
  
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const dateOptions = {
    timeStyle: "short",
    dateStyle: "short",
    timeZone: "America/New_York",
  };

  const getFormattedDate = (date) => {
    const dateObj = new Date(date);
    const dateLocale = dateObj.toLocaleString("en-US", dateOptions);
    const dateDay = weekdays[dateObj.getDay()]
    return `${dateDay} ${dateLocale}`
  }
</script>

<style>
  table {
    text-align: left;
  }

  th, td {
    padding: 5px;
  }
</style>

<h1>{showArchived ? 'Archived Shows' : 'Upcoming Shows'}</h1>

<button on:click={toggleShowArchived}>
	{showArchived ? 'Show unarchived' : 'Show archived'}
</button>

{#await data}
	<p>Loading shows...</p>
{:then data}
  <table>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Venue</th>
    </tr>
    {#each filteredShows as show}
      <tr>
        <td>{getFormattedDate(show.datetime_utc)}</td>
        <td><a href={show.page_url_tm} target="_blank">{show.name}</a></td>
        <td>{show.venue_name}</td>
      </tr>
    {/each}
  </table>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}