let startTime;
let elapsed = 0;
let intervalId;
const timeDisplay = document.getElementById('time');
const resultsList = document.getElementById('resultsList');

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);

function formatTime(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((totalSeconds % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (totalSeconds % 60).toString().padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`
}

function updateDisplay() {
	const currentTime = Date.now();
	const difference = elapsed + (currentTime - startTime);
	timeDisplay.textContent = formatTime(difference);
}

function start() {
	if (!intervalId) {
		startTime = Date.now();
		intervalId = setInterval(updateDisplay, 1000);
	}
}

function stop() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
		const currentTime = Date.now();
		elapsed += currentTime - startTime;

		const listItem = document.createElement('li');
		listItem.textContent = formatTime(elapsed);
		resultsList.appendChild(listItem);
	}
}

function reset() {
	stop();
	elapsed = 0;
	timeDisplay.textContent = '00:00:00';
	resultsList.innerHTML = '';
}
