const baseUrl = `https://www.googleapis.com/youtube/v3`;
const apiKey = `AIzaSyCnqHbJgWTTe4NZo_Fq3KxnP1BC3mNZt1Y`;

async function getVideos(){
    data = await fetch(`${baseUrl}/search?key=${apiKey}&type=videos`);
    video = await data.json();
    videoDetails = await getVideoDetails(video.items[0].id.videoId);
    console.log(video);
    console.log(videoDetails)
}

async function getVideoDetails(videoId){
    video = await fetch(`${baseUrl}/videos?id=${videoId}&key=${apiKey}`);
    console.log(video);
}

getVideos();