const API_KEY="AIzaSyDrGQRyDQdMtDta8Pq1p-UNWplxCPfV7Lw"
const BASE_URL="https://www.googleapis.com/youtube/v3"


window.addEventListener("DOMContentLoaded", () => {
    fetchVideos("Learn JS", 10);
});

async function fetchVideos(searchQuery, maxResults) {
    const response = await fetch(
        `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
    );
    const data = await response.json();
    displayVideos(data.items);
}

function displayVideos(videos) {
    const container = document.getElementById("video-gallery");
    container.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url;

        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <a href="video.html?videoId=${videoId}">
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
            </a>
        `;
        container.appendChild(videoCard);
    });
}


function getVideos(query) {
    fetch(`${BASE_URL}/search?key=${API_KEY}&q=${query}&type=video&maxResults=20&part=snippet`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayVideos(data.items)
        })
}


getVideos("");


document.getElementById("search_btn").addEventListener("click", () => {
    getVideos(document.getElementById("search_input").value);
})