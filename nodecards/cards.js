var cards={
	init : function(){
		this.io = require('socket.io').listen(8080);
		this.elmt = [];
		this.io.sockets.on('connection',this.listen);
		return this;
	},
	
	listen : function(socket){
			socket.on('init',function(){
				socket.emit('initialized',cards.elmt);
			});
			
			socket.on('card', function (datas){
					cards.elmt.push(datas);
					cards.io.sockets.emit('recorded',datas); 
			});
	},
	
	
};
cards.init();