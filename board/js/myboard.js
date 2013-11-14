var datas={};

board.init({
	board : '#board',
	recorded : function(datas){
		$('#map').removeClass('on');
		board.render(datas);
	},
	rendered : function(){
		$('input[name]').val('');
	}
});

localize.init({
	map : '#map div',
	localized : function(pos){
		datas.userLoc={latitude:pos.latitude,longitude:pos.longitude};
		$('#map, .loader').toggleClass('on');
		localize.render(pos);
	},
	found : function(pos){
		datas.destLoc={latitude:pos.latitude,longitude:pos.longitude};
		if(pos){
			localize.markPos(pos);
		}
	}
})

board.checkout();

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
	datas.title = title;
	datas.date = newDate;
	board.record(datas);
});



$('#addLocation').on('click',function(e){
	e.preventDefault();
	localize.getUserLocation();
	$('.loader').toggleClass('on');
});

$('#geocoder').on('submit',function(e){
	e.preventDefault();
	var address=$('input[name=address]').val();
	if(!address){
		return;
	}
	localize.find(address);
});

$('#board').on('click','.deleteButton',function(e){
	e.preventDefault();
	//var key=$(this).attr('data-key');
	var key=$(this).data('key');
	board.delete(key);
	$(this).parent('.card').remove();
})



















