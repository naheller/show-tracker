export async function load() {
	const result = {
		bands: []
	};

	const response = await fetch('http://show-tracker-api-1:3000/getBands');

	if (response.ok) {
		const data = await response.json();
		result.bands = data.bands;
	}

	return result;
}
