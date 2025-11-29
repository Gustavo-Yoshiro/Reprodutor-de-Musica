//document. literalmente o entendimento do documento feito pela web
const songName = document.getElementById('song-name'); //guardando a referencia , o div por isso const
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const bandName = document.getElementById('band-name');
const skip = document.getElementById('skip');
const back = document.getElementById('back');
const currentProgressBar = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

const casa = {
    songName: 'Casa',
    artist :'Colo de Deus',
    file: 'casa'
};
const queimaDeNovo = {
    songName: 'Fogo Santo',
    artist :'Colo de Deus',
    file: 'queima_de_novo'
};
const originalPlaylist = [casa,queimaDeNovo];
let sortedPlaylist = [...originalPlaylist];
let index =0;



function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){ 
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if (isPlaying === false) {
        playSong();
    } else {
        pauseSong();
    }
}

function loadSong(){
    cover.src =`images/${sortedPlaylist[index].file}.png`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName; 
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }else{
        index -=1;
    }
    loadSong();
    playSong();
}

function nextSong(){
    
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }else{
        index +=1;
    }
    loadSong();
    playSong(); 
}

function updateProgress(){
    const barWidth = (song.currentTime/song.duration) *100;
    currentProgressBar.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}

function suffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randonIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randonIndex];
        preShuffleArray[randonIndex] = aux;
        currentIndex -= 1;
    }

}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        suffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}


function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }else{
        playSong();
    }
}

function toHHMMSS(number){
    let hours = Math.floor(number/3600);
    let min = Math.floor((number - hours * 3600) /60);
    let seg = Math.floor(number -  min *60 - hours * 3600);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;    
}


function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);
}
loadSong();

play.addEventListener('click',playPauseDecider);
back.addEventListener('click',previousSong);
skip.addEventListener('click',nextSong);
song.addEventListener('timeupdate',updateProgress);
song.addEventListener('ended',nextOrRepeat);
song.addEventListener('loadedmetadata',updateTotalTime);
progressContainer.addEventListener('click',jumpTo);
shuffleButton.addEventListener('click',shuffleButtonClicked);
repeatButton.addEventListener('click',repeatButtonClicked);