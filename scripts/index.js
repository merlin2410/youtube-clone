const baseUrl = `https://www.googleapis.com/youtube/v3`;
const apiKey = `AIzaSyCnqHbJgWTTe4NZo_Fq3KxnP1BC3mNZt1Y`;

mainContainer = document.getElementById("main-container");

console.log(mainContainer)


async function getVideos(){
    response = await fetch(`${baseUrl}/search?key=${apiKey}&maxResults=20`);
    data = await response.json();
    videos = await data.items;
    
    console.log(videos);
    videoList = await getVideoList(videos);
    console.log(videoList)
    renderVideoCard(videoList);
    
    
}

async function getVideoDetails(videoId){
    video = await fetch(`${baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`);
    videoDetails = await video.json();
    return videoDetails.items[0];
}

async function getVideoList(videos){
    let videoList = [];
    for(let i=0;i<videos.length;i++){
        videoDetails = await getVideoDetails(videos[i].id.videoId)
        videoList.push(videoDetails);
    }
    console.log(videoList);
    return videoList;
}

function renderVideoCard(videoList){
    mainContainer.innerHTML = '';
    for(let i=0;i<videoList.length;i++){
        videoDetails = videoList[i];
        console.log(i)
        mainContainer.innerHTML += `<div class="video-card">
                                        <img class="thumbnail" src="${videoDetails.snippet.thumbnails.default.url}" alt="thumbnail">
                                        <div class="description">
                                            
                                            <img class="channel-icon" id="img" draggable="false" class="style-scope yt-img-shadow" alt="" width="48" src="https://yt3.ggpht.com/ytc/AGIKgqOpJFsx4eSX_dz9DoHq5sr-cPLpC6pZDS-c6nJtvg=s68-c-k-c0x00ffffff-no-rj">
                                            
                                            <div>
                                                <p>${videoDetails.snippet.title}</p>
                                                <p>${videoDetails.snippet.channelTitle}. 1 week ago</p>
                                            </div>
                                        </div>
                                        
                                    </div>`
    }
}

getVideos();