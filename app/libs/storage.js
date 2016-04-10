export default {
	get(k) {
		try {
			return JSON.parse(localStorage.getItem(k));
		}
		catch(error) {
			return null;
		}
	},
	set(k, v) {
		localStorage.setItem(k, JSON.stringify(v));
	}
};