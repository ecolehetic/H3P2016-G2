var player={};

player.video=$('#video');
player.button=$('#button');
player.media=document.getElementById('video');
player.media.load();


player.playPause = function () {
	$(player.button).removeClass('loading');
	if(player.media.paused){
		player.media.play();
		$(player.video).addClass('play');
		$(player.button).addClass('off');
	}
	else{
		player.media.pause();
		$(player.button).removeClass('off');
	}
}

player.updateProgress = function () {
	var progressW=player.media.currentTime*100/player.media.duration;
	$('.progress').width(progressW+'%');
	
	var bufferW=player.media.buffered.end(0)*100/player.media.duration;
	$('.buffer').width(bufferW+'%');
}

player.setTime = function(e){
	var $this=$(this);
	var offsetX=e.pageX-$this.offset().left;
	player.media.currentTime=offsetX*player.media.duration/$this.width();
}


$(player.video)
.on({'canplaythrough' : player.playPause,'click' : player.playPause})
.bind('timeupdate',player.updateProgress);
$('#progressBar').on('click',player.setTime);
$('#button').on('click',player.playPause);














