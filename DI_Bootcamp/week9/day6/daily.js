class Video {
    constructor(title, uploader, time) {
      this.title = title;
      this.uploader = uploader;
      this.time = time; // duration in seconds
    }
  
    // Method to display a watch message
    watch() {
      console.log(
        `${this.uploader} watched all ${this.time} seconds of ${this.title}!`
      );
    }
  }
  
  // 2. Instantiate two Video instances and call watch()
  const firstVideo = new Video("Cat Compilation", "Alice", 120);
  firstVideo.watch();  // Alice watched all 120 seconds of Cat Compilation!
  
  const secondVideo = new Video("JavaScript Tutorial", "Bob", 300);
  secondVideo.watch(); // Bob watched all 300 seconds of JavaScript Tutorial!
  
  // Bonus: Data for five videos
  const videoData = [
    { title: "Travel Vlog", uploader: "Charlie", time: 240 },
    { title: "Workout Routine", uploader: "Dana", time: 180 },
    { title: "Cooking Show", uploader: "Eve", time: 360 },
    { title: "Music Video", uploader: "Frank", time: 210 },
    { title: "DIY Project", uploader: "Grace", time: 150 }
  ];
  
  // 3. Loop through the data to instantiate and call watch()
  videoData.forEach(data => {
    const vid = new Video(data.title, data.uploader, data.time);
    vid.watch();
  });
  