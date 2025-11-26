//document. literalmente o entendimento do documento feito pela web
const songName = document.getElementById('song-name'); //guardando a referencia , o div por isso const
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const bandName = document.getElementById('band-name');
const skip = document.getElementById('skip');
const back = document.getElementById('back');

let isPlaying = false;

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
const playlist = [casa,queimaDeNovo];
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
    cover.src =`images/${playlist[index].file}.png`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName; 
    bandName.innerText = playlist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = playlist.length - 1;
    }else{
        index -=1;
    }
    loadSong();
    playSong();
}

function nextSong(){
    
    if(index === playlist.length - 1){
        index = 0;
    }else{
        index +=1;
    }
    loadSong();
    playSong();
}
loadSong();

play.addEventListener('click',playPauseDecider);
back.addEventListener('click',previousSong)
skip.addEventListener('click',nextSong)