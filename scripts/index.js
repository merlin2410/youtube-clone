const baseUrl = `https://www.googleapis.com/youtube/v3`;
const apiKey = `AIzaSyBloCsNf3VgcrbM1tDiplWc3x18tJMI9hI`;

mainContainer = document.getElementById("main-container");

console.log(mainContainer)


async function getVideos(q){
    response = await fetch(`${baseUrl}/search?key=${apiKey}&q=${q}&maxResults=20`);
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
        console.log(videoDetails)
        console.log(videoDetails.id)
        mainContainer.innerHTML += `
                                        <div class="video-card" onclick="openVideoDetails('${videoDetails.id}')">
                                        <img class="thumbnail" src="${videoDetails.snippet.thumbnails.default.url}" alt="thumbnail">
                                        <div class="description">
                                            
                                            <img class="channel-icon" id="img" draggable="false" class="style-scope yt-img-shadow" alt="" width="48" src="https://yt3.ggpht.com/ytc/AGIKgqOpJFsx4eSX_dz9DoHq5sr-cPLpC6pZDS-c6nJtvg=s68-c-k-c0x00ffffff-no-rj">
                                            
                                            <div>
                                                <h4>${videoDetails.snippet.title}</h4>
                                                <p>${videoDetails.snippet.channelTitle}. 1 week ago</p>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    `
    }
}

function openVideoDetails(videoId){
    localStorage.setItem("videoId",videoId)
    window.open("/videoDetails.html");
}


searchArea = document.getElementById("search-element");
let q = "";
searchArea.addEventListener("input",(e)=>{
    q = e.target.value;
    
})

searchButton = document.getElementById("search-button");
console.log(searchButton)
searchButton.addEventListener("click",(e)=>{
    getVideos(q);
});