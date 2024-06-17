console.log("js is connected");
let currentsong = new Audio();
const secondsToMinutes = (inpSec) => {
    if (!isNaN) {
        console.log("Invalid number")
    }
    const minutes = Math.floor(inpSec / 60);
    const seconds = Math.floor(inpSec % 60);
    let fmin = String(minutes).padStart(2, "0")
    let fsec = String(seconds).padStart(2, "0")
    return `${fmin}:${fsec}`;
}
async function getSongs() {
    let x = await fetch("http://127.0.0.1:5500/songs/");
    let res = await x.text();
    // console.log(res);
    let div = document.createElement("div");
    div.innerHTML = res;
    let a = div.getElementsByTagName("a")
    console.log(a);
    let songs = [];
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
            // console.log(index)
        }
    }
    return songs;
}
function playMusic(track,f=false)  {
    currentsong.src = `/songs/` + track + `.mp3`;
    if(!f){
        currentsong.play()
        play.src = "asserts/images/pause.svg"
    }
    
    
    console.log(currentsong.src)
    let sn = document.querySelector(".songName");
    sn.innerHTML = track;
    
}
async function main() {

    let songs = await getSongs()
    //    console.log(songs);
    let songsUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const element of songs) {
        songsUl.innerHTML += `<li>
    <img src="asserts/images/music.svg" alt="">
    <p>${element.replaceAll("%20", " ").replaceAll(".mp3", "")}</p>
    <div class="playNow">Play now
        <img id="secpic"
    src="asserts/images/playbt.svg" alt="">
    </div>
   </li>`;
    }
    let i = Math.floor(Math.random()*songs.length);
    playMusic(songs[i].replaceAll("%20",' ').replaceAll(".mp3",""), true);
    console.log(songs[0].replaceAll("%20",' '))

    //****/
    let arr = Array.from(document.querySelector(".songList").getElementsByTagName("li"));
    arr.forEach((e) => {
        e.addEventListener("click", () => {
            console.log(e.getElementsByTagName("p")[0].innerHTML);
            playMusic(e.getElementsByTagName("p")[0].innerHTML.trim());
        })
    })

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "/asserts/images/pause.svg"
        }
        else {
            currentsong.pause();
            play.src = "asserts/images/playbt.svg"
        }
    })
    currentsong.addEventListener("timeupdate", (e) => {
        // console.log(currentsong.currentTime,currentsong.duration)
        document.querySelector(".duration").innerHTML = secondsToMinutes(currentsong.currentTime) + " / " + secondsToMinutes(currentsong.duration);
        document.getElementsByClassName("circle")[0].style.left=((currentsong.currentTime/currentsong.duration)*100)+"%"
        // document.querySelector(".circle").style.left=
    })

    //add event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        
        document.querySelector(".circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%";
        currentsong.currentTime=currentsong.duration*e.offsetX/e.target.getBoundingClientRect().width 
        // 482 945
        // 1448 945
    })
    document.addEventListener("keydown",(e)=>{
        console.log(e.code)
        if(e.code =="Space"){
            if (currentsong.paused) {
                currentsong.play()
                play.src = "/asserts/images/pause.svg"
            }
            else {
                currentsong.pause();
                play.src = "asserts/images/playbt.svg"
            }
        }
    })
}
main()


