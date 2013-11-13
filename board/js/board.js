var board={
	//propriété par défaut
	defaults : {
		board : '#boardCanvas',
		recorded : function(){},
		rendered : function(){}
	},
	//merge des propriétés
	init : function(options){
		this.params=$.extend(this.defaults,options);
	},
	//record dans le localStorage et appel du CBck recorded
	record : function(datas){
		localStorage.setItem(datas.date,JSON.stringify(datas));
		this.params.recorded.call(this,datas);
	},
	//display de la card dans params.board
	render : function(datas){
		var div=$('<div>').addClass('card');
		var spanDate=$('<span>').addClass('date').html(datas.date);
		var spanText=$('<span>').addClass('text').html(datas.title);
		var deleteButton=$('<a>').attr('href','').attr('data-key',datas.date).addClass('deleteButton').text('[delete]');
		div.append(spanDate,spanText,deleteButton);
		$(this.params.board).append(div);
	},
	
	checkout : function(){
		for(i in localStorage){
			var datas=localStorage.getItem(i);
			this.render(JSON.parse(datas));
		}
	},
	
	delete : function(key){
		localStorage.removeItem(key);
	}
	
}


























