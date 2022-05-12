export default function getHeaders(authenticated, isFormData) {
	return  new Headers(
		!isFormData
		? {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
		: {}
	);
}