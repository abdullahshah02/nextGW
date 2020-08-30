import axios from 'axios';

export default async (req, res) => {
	try {
		const { baseURL } = req.query;
		const tunnel_path = `http://197bf69c73c4.ngrok.io/home/pi/glimpse-cam/glimpseLog.log`;
		const response = await axios.get(tunnel_path);
		const log = response.data.split('\n').reverse();
		const log_v1 = log.map(string => {
			return string.replace(/{.*?}/, '').split('  ');
		});
		const log_v2 = log_v1.map(string => {
			const dateTime = string[0];
			const content = string[1] ? string[1].split(' - ') : null;
			const time = dateTime ? dateTime.split(' ')[1] : null;

			let message;
			if (content) {
				message = content[1].endsWith('.') ? content[1].substring(0, content[1].length-1).toUpperCase() : content[1].toUpperCase();
			}

			let formattedTime;
			if (time) {
				const hours = time.substring(0, 2);
				const minutes = time.substring(3, 5);
				formattedTime = formatTime(`${hours}.${minutes}`);
			}

			return [formattedTime, message];
		})
		res.status(200).json({ log: log_v2 });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

function formatTime(time) {

	if (!time) return;

	const split_time = time.split('.');
	let flag = 'am';
	let hours = parseInt(split_time[0]);

	if (hours >= 12) {
		if (hours > 12) {
			hours -= 12;
		}
		flag = 'pm';
	}

	if (hours < 10) {
		hours = `0${hours}`
	}
	return `${hours}:${split_time[1]} ${flag.toUpperCase()}`
}