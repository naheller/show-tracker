export async function load() {
	const result = {
		shows: []
	};

	const response = await fetch('http://show-tracker-api-1:3000/getShows');

	if (response.ok) {
		const data = await response.json();
		result.shows = data.shows;
	}

	return result;
}
