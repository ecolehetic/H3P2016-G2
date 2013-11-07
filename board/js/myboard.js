board.init({
	board : '#board',
	recorded : function(datas){
		board.render(datas);
	},
	rendered : function(){
		
	}
});


$('#addCard').on('submit',function(e){
	e.preventDefault();
	var title=$('input[name=name]').val();
	var date=$('input[name=date]').val();
	if(!title){
		return;
	}
	if(!date){
		var newDate=new Date().getTime();
	}
	else{
		var newDate=new Date(date).getTime();
	}
	//var newDate=!date?new Date().getTime():new Date(date).getTime();
	var datas={title : title,date : newDate}
	board.record(datas);
});