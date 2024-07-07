<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>My bands</h1>

{#await data}
	<p>Loading bands...</p>
{:then data}
	<ul>
		{#each data.bands as band}
			<li><a href={band.page_url_tm} target="_blank">{band.name}</a></li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}