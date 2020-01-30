'use strict';

function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
		seconds = parseInt((duration / 1000) % 60),
		minutes = parseInt((duration / (1000 * 60)) % 60),
		hours = parseInt((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return minutes + ":" + seconds;
}

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.parallax');
	var instances = M.Parallax.init(elems);
});

var app = new Vue({
	el: '#itunes-app',
	data: {
	  query: 'Disturbed',
	  items: [],
	  curAudio : {
			file: new Audio(),
			index: 0
		} 
	},
	methods : {
		getItems(){
			let url = `https://itunes.apple.com/search?term=${this.query}&limit=20`;
			
			fetch(url)
				.then( response => response.json() )
				.then( iList => {
					console.log(iList);
					iList.results.forEach((element, index) => {
						iList.results[index].isPlaying = false;
					});
					this.items = iList.results; 					
				})
		},
		msToTime(duration) {
			var milliseconds = parseInt((duration % 1000) / 100),
				seconds = parseInt((duration / 1000) % 60),
				minutes = parseInt((duration / (1000 * 60)) % 60),
				hours = parseInt((duration / (1000 * 60 * 60)) % 24);
			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;
			return minutes + ":" + seconds;
		},
		getHiResImg(url){
			return url.replace(/100x100/gi, '400x400');
		},
		playAudio(index){
			let audioUrl = this.items[index].previewUrl;

			let nextAudio = new Audio(audioUrl);
			let curAudio = this.curAudio.file;

			this.items[index].isPlaying = !this.items[index].isPlaying;

			if(nextAudio.src == curAudio.src){
				curAudio.paused ? curAudio.play() : curAudio.pause();				
			} else {
				curAudio.pause();
				this.items[this.curAudio.index].isPlaying = false;
				nextAudio.play();

				this.curAudio.file = nextAudio;
				this.curAudio.index = index;
			}
		}
	}
 });

