import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		return await fetch('http://show-tracker-api-1:3000/getShows').then((res) => res.json());
	} catch (e) {
		error(500, 'There was an error fetching shows');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	archiveShow: async ({ request }) => {
		const data = await request.formData();
		const idTm = data.get('idTm');
		const archived = data.get('archived');
		let resOk = false;

		try {
			const res = await fetch(`http://show-tracker-api-1:3000/archiveShow/${idTm}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ archived })
			});

			resOk = res.ok;

			if (!resOk) {
				error(500, `There was an error archiving the show: ${res.statusText}`);
			}
		} catch (e) {
			console.error('e', e);
			error(500, `There was an error archiving the show: ${e}`);
		}

		redirect(303, '/shows');
	}
};
