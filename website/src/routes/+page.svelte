<script>
	async function fetchAttractionsByKeyword(keyword) {
		const res = await fetch(`http://localhost:3000/getBandsByKeyword/${keyword}`);

		if (res.ok) {
			return res.json();
		} else {
			throw new Error('help');
		}
	}

	async function fetchEventsByAttractionId(attractionId) {
		const res = await fetch(`http://localhost:3000/getShowsByBandId/${attractionId}`);

		if (res.ok) {
			return res.json();
		} else {
			throw new Error('help');
		}
	}

	async function addBand(bandData) {
		const res = await fetch(`http://localhost:3000/addBand`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...bandData })
		});

		if (res.ok) {
			return res.json();
		} else {
			throw new Error('help');
		}
	}

	function toDashCase(text) {
		const list = text.split(' ');
		const lowerCaseList = list.map((word) => word.toLowerCase());
		return lowerCaseList.join('-');
	}

	let keyword = '';
	let attractionsPromise = Promise.resolve({ attractions: [] });
	let eventsPromise = Promise.resolve({ events: [] });
	let addBandPromise = Promise.resolve({});
</script>

<h1>hey {keyword}</h1>
<input type="text" bind:value={keyword} />
<button
	on:click={() => {
		if (keyword) {
			const dashCaseKeyword = toDashCase(keyword);
			attractionsPromise = fetchAttractionsByKeyword(dashCaseKeyword);
		}
	}}>submit</button
>

<p>---Attractions---</p>

{#await attractionsPromise}
	<p>loading...</p>
{:then data}
	{#each data.attractions as attraction}
		<div>
			<button
				on:click={() => {
					if (attraction.id) {
						eventsPromise = fetchEventsByAttractionId(attraction.id);
					}
				}}>see shows</button
			>
			<button
				on:click={() => {
					if (attraction.id) {
						addBandPromise = addBand({
							id: attraction.id,
							name: attraction.name,
							url: attraction.url
						});
					}
				}}>add band</button
			>
			<span>{attraction.name}</span>
		</div>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<p>---Events---</p>

{#await eventsPromise}
	<p>loading...</p>
{:then data}
	{#each data.events as event}
		<p>{event.dates.start.localDate}: {event.name}</p>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
