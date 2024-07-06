<script>
	export let data;
</script>

<h1>bands</h1>

{#if data.bands.length}
	<ul>
		{#each data.bands as band}
			<li><a href={band.page_url_tm} target="_blank">{band.name}</a></li>
		{/each}
	</ul>
{:else}
	<p>No bands</p>
{/if}