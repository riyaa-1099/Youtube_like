//https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=rrr&key=[AIzaSyD4qhmFVVRD3PDOMSzsPlFdg1ldP05LB5k]

import navbar from './components/navbar.js';

 let navbarDiv=document.getElementById("navbar_Div")
 navbarDiv.innerHTML = navbar();

let searchingBtn=document.getElementById("searchingVid");
 searchingBtn.addEventListener("click",function(){searchVideos("relevance")});

// let views=document.getElementById("view");
// views.addEventListener("click",sortby)

// let sortby=()=>{
//  set_order="viewCount";
// searchVideos();
// }
let p=localStorage.getItem("name_show")
document.getElementById("name_show").innerHTML=p||"Please Sign-up";

let views=document.getElementById("view");
 views.addEventListener("click",sortBy1)

 let alphs=document.getElementById("alph");
 alphs.addEventListener("click",sortBy2)
 
let pops=document.getElementById("pop");
pops.addEventListener("click",sortBy3)

function sortBy1(){
searchVideos("viewCount")
}

function sortBy2(){
    searchVideos("title")
    }

   function sortBy3(){
        searchVideos("rating")
        }

//const searchVideos = async(val)=>{
async function searchVideos(val){
try{
//let value=val||"relevance"
    const API_KEY =`AIzaSyB_YU2jP321JEK5WYmDtnJiabPWnJdZvK4`;
    let search_term = document.getElementById("search_term").value;
    
//title rating &order=${val||`relevance`}
//let response= await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=${val||"relevance"}&q=${search_term}&key=${API_KEY}`);
//&order=${val}||relevance 'https://youtube.googleapis.com/youtube/v3/search?order=viewCount&key=[YOUR_API_KEY]'
let response =await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&order=${val}&key=${API_KEY}&type=video&videoEmbeddable=true&chart=mostPopular`);
let data=await response.json();
let actual_data=data.items;
console.log(data.items)
appendVideos(actual_data)
}catch(err){
    console.log('err:',err)
}

};

const container=document.getElementById('container');

const appendVideos=(data)=>{
    container.innerHTML=null;
data.forEach(({snippet, id:{videoId}})=>{
 //  console.log(snippet)
let div=document.createElement('div');

let p_title=document.createElement('p');
p_title.innerText=snippet.title;

let p_channel_name=document.createElement('p')
p_channel_name.innerText=snippet.channelTitle;

let thumbnail=document.createElement('img');
thumbnail.src=snippet.thumbnails.high.url;

div.append(thumbnail,p_title, p_channel_name);

div.onclick = () => {
let data = {
snippet,
videoId
//if name and value same
};

data= JSON.stringify(data)
localStorage.setItem('clicked_video',data)
window.location.href='/video.html';
};

container.append(div);

});

};

let signup=document.getElementById("signup");
 signup.addEventListener("click",function(){
    window.location.href='/signup.html';
 })