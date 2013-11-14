var board={
	defaults : {
		board : '#board',
		recorded : function(){},
		deleted : function(){},
		map : function(){},
		empty : function(){}
	},
	
	init : function (options) {
		this.params=$.extend(this.defaults,options);
	},
	
	record : function (datas) {
		var key=new Date(datas.date).getTime();
		localStorage.setItem(key,JSON.stringify(datas));
		this.params.recorded.call(this,key,datas);
	},
	
	render : function (key,datas){
		var div = $('<div>').addClass('card').attr('id','c'+key);
	  var deleteButton = $('<a>').attr('href','').text('[Delete]').addClass('deleteButton').on('click',function(e){
			e.preventDefault();
			board.delete(key);
		});
		if(typeof datas.destPos==='object' && datas.userPos.lat){
			var mapButton = $('<a>').attr('href','').text('[Map]').addClass('mapButton').on('click',function(e){
				e.preventDefault();
				board.params.map.call(this,key,datas);
			});
			var map =  $('<div>').addClass('map');
		}
		var d=new Date(datas.date); 
		var date=d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
	  var dateSpan=$('<span>').addClass('date').text(date);
		var textSpan=$('<span>').addClass('text').text(datas.title);
		$(this.params.board).append(div.append(dateSpan).append(textSpan).append(map).append(deleteButton).append(mapButton));
	},
	
	checkout : function(){
		for(i in localStorage){
			var datas=JSON.parse(localStorage.getItem(i));
			this.render(i,datas);
		}
		this.isEmpty();
	},
	
	isEmpty : function(){
		if(localStorage.length<1){
			this.params.empty.call(this);
		}
	},
	delete : function (key) {
		localStorage.removeItem(key);
		this.isEmpty();
		this.params.deleted.call(this,key);
	}
	
};


























