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
		var d=new Date(datas.date);
		var date=d.getFullYear()+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+('0'+d.getDate()).slice(-2);
		var spanDate=$('<span>').addClass('date').text(date);
		var spanText=$('<span>').addClass('text').text(datas.title);
		var deleteButton=$('<a>').attr('href','').attr('data-key',datas.date).addClass('deleteButton').text('[delete]');
		div.append(spanDate,spanText,deleteButton);
		if(datas.userLoc&&datas.destLoc){
			var miniMap=$('<div>').addClass('map');
			var mapButton=$('<a>').attr('href','').attr('data-key',datas.date).addClass('mapButton').text('[see map]');
			div.append(miniMap,mapButton);
		}
		$(this.params.board).append(div);
		this.params.rendered.call(this);
	},
	
	checkout : function(){
		for(i in localStorage){
			var datas=localStorage.getItem(i);
			this.render(JSON.parse(datas));
		}
	},
	
	delete : function(key){
		localStorage.removeItem(key);
	},
	
	getItem : function(key){
		return JSON.parse(localStorage.getItem(key));
	}
	
}


























