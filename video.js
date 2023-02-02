import navbar from './components/navbar.js';

 let navbarDiv=document.getElementById("navbar1")
 navbarDiv.innerHTML = navbar();


const showClickedVideo = () => {

    let data = localStorage.getItem('clicked_video');

    let { videoId,snippet } = JSON.parse(data);
//data.videoId;
    let iframe = document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${videoId}`;
    iframe.width='95%';
    iframe.height ='100%';

    let p_title=document.createElement('p');
    p_title.innerText=snippet.title;
    
    let p_channel_name=document.createElement('p')
    p_channel_name.innerText=snippet.channelTitle;

    let p_description=document.createElement('p')
    p_description.innerText=snippet.description;
//iframe.setAttribute("allowfullscreen", true);


let video_div = document.getElementById("video_details");
video_div.append(iframe,p_title,p_channel_name,p_description);

};

window.onload=showClickedVideo();