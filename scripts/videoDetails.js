const baseUrl = `https://www.googleapis.com/youtube/v3`;
const apiKey = `AIzaSyAEwL1eIor7nqinmj8SME7BlN6wQbr56pY`;

container = document.getElementById("container");
videoId = localStorage.getItem("videoId");


async function getVideo(){
    videoDetails = await getVideoDetails(videoId);
    console.log(videoDetails);
    let videoParams = {
        id: videoDetails.id,
        channelTitle: videoDetails.snippet.channelTitle,
        title: videoDetails.snippet.title,
        viewCount: videoDetails.statistics.viewCount,
        likeCount: videoDetails.statistics.likeCount,
        commentCount: videoDetails.statistics.commentCount,




    }
    console.log(videoParams);
    renderVideoFrame(videoDetails);
}

function renderVideoFrame(videoId){
    container.innerHTML = `<iframe class="yt_video" id="yt-video" width="1000" height="500" src="https://www.youtube.com/embed/${videoId}?autoplay=1" allowfullscreen ></iframe>
                            <div class="video-description">
                                <h3>Title</h3>
                                <div class="views-likes">
                                    <div class="views">
                                        <p>3M Views . Oct 2022</p>
                                    </div>
                                    <div class="likes">
                                        <div><span class="material-symbols-outlined">
                                            thumb_up
                                            </span></div>
                                        <div>325K</div>
                                    </div>
                                </div>
                            </div>`
}


renderVideoFrame(videoId)

async function getVideoDetails(videoId){
    video = await fetch(`${baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`);
    videoDetails = await video.json();
    console.log(videoDetails.items[0])
    return videoDetails.items[0];
}




getVideo();