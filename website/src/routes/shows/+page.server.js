import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		return await fetch('http://show-tracker-api-1:3000/getShows').then((res) => res.json());
	} catch (e) {
		throw error(500, 'There was an error fetching shows');
	}
}
