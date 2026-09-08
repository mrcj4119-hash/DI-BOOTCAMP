class Video {
	constructor(title, uploader, time) {
		this.title = title;
		this.uploader = uploader;
		this.time = time;
	}

	watch() {
		console.log(`${this.uploader} watched all ${this.time} of ${this.title}!`);
	}
}

const firstVideo = new Video('JavaScript Basics', 'Alice', 360);
firstVideo.watch();

const secondVideo = new Video('Object-Oriented Programming', 'Bob', 480);
secondVideo.watch();

const videoData = [
	{ title: 'HTML Fundamentals', uploader: 'Charlie', time: 240 },
	{ title: 'CSS Layouts', uploader: 'Diana', time: 300 },
	{ title: 'Node.js Introduction', uploader: 'Ethan', time: 420 },
	{ title: 'Working with Arrays', uploader: 'Fatima', time: 270 },
	{ title: 'JavaScript Classes', uploader: 'Grace', time: 390 }
];

const videos = videoData.map(({ title, uploader, time }) => new Video(title, uploader, time));
videos.forEach((video) => video.watch());
