import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// return await fetch('http://localhost:3000/getBands').then((res) => res.json());
		return await fetch('http://show-tracker-api-1:3000/getBands').then((res) => res.json());
	} catch (e) {
		throw error(500, 'There was an error fetching bands');
	}
}
