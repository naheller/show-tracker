import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	try {
		const keyword = url.searchParams.get('band');
		if (!keyword) {
			return {
				attractions: []
			};
		}
		return await fetch(`http://show-tracker-api-1:3000/getBandsByKeyword/${keyword}`).then((res) =>
			res.json()
		);
	} catch (e) {
		console.log('e', e);
		throw error(500, 'There was an error completing your band search');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	addBand: async ({ request }) => {
		const data = await request.formData();
		console.log('formData', data);

		const name = data.get('name');
		const id = data.get('id');
		const url = data.get('url');

		let resOk = false;

		try {
			const res = await fetch(`http://show-tracker-api-1:3000/addBand`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, id, url })
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
