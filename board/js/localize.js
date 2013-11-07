var localize={
	
	defaults : {
		map : '',
		zoom : 17,
		center : {latitude:48.857713,longitude:2.347271},
		localized : function(){}
	},
	
	init : function(options){
		this.params=$.extend(this.defaults,options);
	},
	
	getUserLocation : function(){
		navigator.geolocation.getCurrentPosition(
		function(position){
			localize.params.localized.call(this,position.coords);
		},
		function(){
			localize.params.localized.call(this,null);
		},
		{enableHighAccuracy:true}
		);
	},
	
	render : function(pos){
		if(!pos){
			var latLng=new google.maps.LatLng(this.params.center.latitude,this.params.center.longitude);
		}
		else{
			var latLng=new google.maps.LatLng(pos.latitude,pos.longitude);
		}
		
		var settings={
			zoom:this.params.zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center:latLng};
			
		new google.maps.Map(document.querySelector(this.params.map),settings);
		
	}
	
};











