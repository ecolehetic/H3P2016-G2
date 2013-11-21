var board={
  init : function(){
    this.socket = io.connect('http://macbook-maraboutee.local:8080');
		this.listen();
    return this;
  },

	getAll : function(){
		this.socket.emit('init');
		this.socket.on('initialized',function(datas){
      for (i in datas){
        board._render(datas[i]);
      } 
    });
	},
  
  listen : function(){
    this.socket.on('recorded',function(datas){
      board._render(datas);
    });
  },
  
  _render : function(datas){
    var div=$('<div>').addClass('card');
		var textSpan=$('<span>').addClass('text').html(datas.title);
		$('#board').append(div.append(textSpan));
  },
  
}
board.init().getAll();

$('#addCard').on('submit',function(e){
  e.preventDefault();
  var datas={title:$('input[name=name]').val()};
  board.socket.emit('card', datas);
  $('input[name=name]').val('');
});








