const padsContainer = document.querySelector("#pads");
const volumeControl = document.querySelector("#volume");
const status = document.querySelector("#status");

const instruments = [
	{ key: "a", name: "Kick", description: "Deep pulse", sound: "kick.wav", imagePosition: "center 72%" },
	{ key: "s", name: "Snare", description: "Sharp crack", sound: "snare.wav", imagePosition: "20% 62%" },
	{ key: "d", name: "Hi-hat", description: "Closed shimmer", sound: "hihat.wav", imagePosition: "78% 63%" },
	{ key: "f", name: "Open hat", description: "Airy finish", sound: "openhat.wav", imagePosition: "90% 36%" },
	{ key: "g", name: "Tom", description: "Round tone", sound: "tom.wav", imagePosition: "42% 45%" },
	{ key: "h", name: "Clap", description: "Handmade snap", sound: "clap.wav", imagePosition: "center 28%" },
	{ key: "j", name: "Ride", description: "Bright wash", sound: "ride.wav", imagePosition: "72% 22%" },
	{ key: "k", name: "Crash", description: "Wide splash", sound: "boom.wav", imagePosition: "18% 22%" },
	{ key: "l", name: "Tink", description: "Small accent", sound: "tink.wav", imagePosition: "55% 12%" },
];

const audios = new Map();

function playInstrument(instrument) {
	const audio = audios.get(instrument.key);
	if (!audio) return;
	audio.currentTime = 0;
	audio.volume = Number(volumeControl.value);
	audio.play().catch(() => {
		status.textContent = "Click to enable audio";
	});
	const pad = document.querySelector(`[data-key="${instrument.key}"]`);
	pad.classList.add("active");
	status.textContent = instrument.name;
	window.setTimeout(() => pad.classList.remove("active"), 120);
}

instruments.forEach((instrument) => {
	const pad = document.createElement("button");
	pad.className = "pad";
	pad.type = "button";
	pad.dataset.key = instrument.key;
	pad.innerHTML = `<img class="pad-image" src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=420&q=80" alt="${instrument.name} on a drum kit" style="object-position: ${instrument.imagePosition}"><span class="pad-shade" aria-hidden="true"></span><span class="pad-key">${instrument.key.toUpperCase()}</span><span class="pad-name">${instrument.name}</span><span class="pad-desc">${instrument.description}</span>`;
	pad.addEventListener("click", () => playInstrument(instrument));
	padsContainer.append(pad);

	const audio = new Audio(`sounds/${instrument.sound}`);
	audios.set(instrument.key, audio);
});

document.addEventListener("keydown", (event) => {
	if (event.repeat) return;
	const instrument = instruments.find((item) => item.key === event.key.toLowerCase());
	if (instrument) playInstrument(instrument);
});
