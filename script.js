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
const suffleButton = document.getElementById('suffle');


let isPlaying = false;
let isShuffled = false;

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

function uptadeProgressBar(){
    const barWidth = (song.currentTime/song.duration) *100;
    currentProgressBar.style.setProperty('--progress', `${barWidth}%`);
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
        let aux = preShuffleArray[currentIndex]
        preShuffleArray[currentIndex] = preShuffleArray[randonIndex];
        preShuffleArray[randonIndex] = aux;
        currentIndex -= 1;
    }

}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        suffleArray(sortedPlaylist);
        suffleButton.classList.add('button-active');
    }else {
        isShuffled = false;
        sortedPlaylist = [originalPlaylist];
        suffleButton.classList.remove('button-active');
    }
}
loadSong();

play.addEventListener('click',playPauseDecider);
back.addEventListener('click',previousSong);
skip.addEventListener('click',nextSong);
song.addEventListener('timeupdate',uptadeProgressBar);
progressContainer.addEventListener('click',jumpTo);
suffleButton.addEventListener('click',shuffleButtonClicked)