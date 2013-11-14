// Objet
var player = {
	params : {
		video : '#video',
		progress : '#progress',
		buffer : '#buffer',
		control : '#control',
		button : '#button',
		file:'',
		loaded : function(){},
		playing : function(){},
		paused : function(){}
	},
	
	init : function(options){
		this.property=$.extend(this.params,options);
		this.media=$(this.property.video)[0];
	},
	
	load : function(){
		this.media.load(); 
		$(this.property.video).on('canplaythrough',function(){
			player.property.loaded.call(this);
		})
	},
	
	play : function(){ 
		this.media.play();
		this.property.playing.call(this);
	},
	
	pause : function(){},
	
	setTime : function(){},
	
	random :  function(e){
		e.preventDefault();
		$.ajax({
			url:player.property.file,
			dataType:'json',
			success:function(data){
				var source = data[Math.floor(Math.random()*data.length)];
				$(player.property.video).children(0).attr('src',source.src);
				player.load();
			}
		});
		//$.getJSON(player.property.file,function(data){});
	}
	
};

// Utilisateur
player.init({
	progress : '.progress',
	buffer : '.buffer',
	control : '#progressBar',
	file:'random.json',
	loaded : function(){
		console.log('loaded');
		player.play(); 
	},
	playing : function(){
		console.log('playing'); 
		$(player.property.video).addClass('play');
		$(player.property.button).removeClass('loading').addClass('off');
	}
});
player.load();
$('#random').on('click',player.random);


















