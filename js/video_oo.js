var player= function(params){
	var self=this;
	self.video=document.querySelector(params.media);
	self.controller=document.querySelector(params.controller);
	self.progress=document.querySelector(params.progress);
	self.buffer=document.querySelector(params.buffer);
	
	self.video.load();
	
	self.playpause=function(){ 
		
		if(self.video.paused){
			self.video.play();
			if(typeof params.played==="function"){
					params.played.call();
			}
			
		}else{
			self.video.pause();
			if(typeof params.paused==="function"){
				params.paused.call();
			}
		}
	}
	
	self.setVideoTime=function(e){ 
		var x=e.offsetX;
		var newTime=x*self.video.duration/this.offsetWidth;
		self.video.currentTime=newTime;
		if(typeof params.paused==="function"){
			params.paused.call();
		}
	}
	
	
	self.updateProgress = function (){
		var progressWidth=this.currentTime*100/this.duration;
		self.progress.style.width=progressWidth+'%';

		var bufferWidth=this.buffered.end(0)*100/this.duration;
		self.buffer.style.width=bufferWidth+'%';
		
	}
	
	//si canplaythrough
	self.video.addEventListener('canplaythrough',function(){

		//on appelle le callback loaded en passant self en argument.
		if(typeof params.loaded==="function"){
			params.loaded.call(this,self);
		}
	},false);
	self.video.addEventListener('timeupdate',self.updateProgress,false);

};
