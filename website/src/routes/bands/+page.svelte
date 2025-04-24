<script>
	/** @type {import('./$types').PageData} */
	export let data;

	$: sortedBands = (data?.bands ? [...data?.bands] : []).sort((a, b) => (
    a.name.localeCompare(b.name)
  ))
</script>

<style>
  table {
    text-align: left;
  }

  th, td {
    padding: 5px;
  }
</style>

<h1>My bands</h1>

{#await data}
	<p>Loading bands...</p>
{:then data}
		<table>
			<tr>
				<th>Name</th>
				<th>Action</th>
			</tr>
			{#each sortedBands as band}
				<tr>
					<td><a href={band.page_url_tm} target="_blank">{band.name}</a></td>
					<td>
						<form method="POST" action="?/deleteBand">
							<button type="submit">Delete</button>
							<input name="id" value={band.id} style="display: none;" />
						</form>
					</td>
				</tr>
			{/each}
		</table>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}