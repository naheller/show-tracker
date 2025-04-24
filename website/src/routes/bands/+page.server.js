import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// return await fetch('http://localhost:3000/getBands').then((res) => res.json());
		return await fetch('http://show-tracker-api-1:3000/getBands').then((res) => res.json());
	} catch (e) {
		throw error(500, 'There was an error fetching bands');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteBand: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		let resOk = false;

		try {
			// const res = await fetch(`http://localhost:3000/deleteBand/${id}`, {
			const res = await fetch(`http://show-tracker-api-1:3000/deleteBand/${id}`, {
				method: 'DELETE'
			});

			resOk = res.ok;
		} catch (error) {
			return { success: false };
		}

		if (resOk) {
			throw redirect(302, '/bands');
		}
	}
};
