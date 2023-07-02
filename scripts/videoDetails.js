const baseUrl = `https://www.googleapis.com/youtube/v3`;
const apiKey = `AIzaSyA9KCKKSGpn2ucrPaakeOyh6vieBh2Ae0s`;

container = document.getElementById("container");
videoId = localStorage.getItem("videoId");


async function getVideo(){
    videoDetails = await getVideoDetails(videoId);
    console.log(videoDetails);
    comments = await getComments();
    console.log(comments)
    let videoParams = {
        id: videoDetails.id,
        channelTitle: videoDetails.snippet.channelTitle,
        title: videoDetails.snippet.title,
        viewCount: videoDetails.statistics.viewCount,
        likeCount: videoDetails.statistics.likeCount,
        commentCount: videoDetails.statistics.commentCount,
        commentList: []

    }
    for(let i=0;i<comments.length;i++){
        let obj = {
            authorName: comments[i].snippet.topLevelComment.snippet.authorDisplayName,
            authorImage: comments[i].snippet.topLevelComment.snippet.authorProfileImageUrl,
            text: comments[i].snippet.topLevelComment.snippet.textDisplay
        }
        
        videoParams.commentList.push(obj);
    }
    console.log(videoParams);
    renderVideoFrame(videoParams);
    renderComments(videoParams);
}

async function getComments(){
    response = await fetch(`${baseUrl}/commentThreads?key=${apiKey}&videoId=${videoId}&maxResults=80&order=time&part=snippet`);
    data = await response.json();
    comments = data.items;
    return comments;
}
getComments();
function renderVideoFrame(videoParams){
    container.innerHTML = `<iframe class="yt_video" id="yt-video" width="1000" height="500" src="https://www.youtube.com/embed/${videoId}?autoplay=1" allowfullscreen ></iframe>
                            <div class="video-description">
                                <h3>${videoParams.title}</h3>
                                <div class="views-likes">
                                    <div class="views">
                                        <p>${videoParams.viewCount} Views . Oct 2022</p>
                                    </div>
                                    <div class="likes">
                                        <div><span class="material-symbols-outlined">
                                            thumb_up
                                            </span></div>
                                        <div>${videoParams.likeCount}</div>
                                    </div>
                                </div>
                            </div>`
}

function renderComments(videoParams){
    commentContainer = document.createElement("div");
    commentContainer.className="comment-container";
    commentList = videoParams.commentList;
    commentContainer.innerHTML = `<div class = "comment-count">
                            <p>${videoParams.commentCount} Comments</p>
                        </div>`;
    for(let obj of commentList){
        commentContainer.innerHTML += `<div class = "comment-list">
                                <div class="author-image">
                                    <img src="${obj.authorImage}">
                                </div>
                                <div class="title-comment">
                                    <h5>${obj.authorName}</h5>
                                    <p>${obj.text}</p>
                                </div>
                            </div>`
    }
    container.appendChild(commentContainer);
    
}




async function getVideoDetails(videoId){
    video = await fetch(`${baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`);
    videoDetails = await video.json();
    console.log(videoDetails.items[0])
    return videoDetails.items[0];
}




getVideo();