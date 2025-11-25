//document. literalmente o entendimento do documento feito pela web
const songName = document.getElementById('song-name'); //guardando a referencia , o div por isso const
const song = document.getElementById('audio');
const play = document.getElementById('play');

songName.innerText = 'Casa';

function playSong(){
    song.onplay();
}

function pauseSong(){
    song.onpause();
}

play.addEventListener('click',playSong);