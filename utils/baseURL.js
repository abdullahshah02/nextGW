
export default function getBaseURL(window) {
	const getUrl = window.location;
	return `${getUrl.protocol}//${getUrl.host}:`;
}

