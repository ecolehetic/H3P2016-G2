var localize={
	
	defaults : {
		map : '',
		zoom : 17,
		center : {latitude:48.857713,longitude:2.347271},
		localized : function(){},
		found : function(){}
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
			
		this.map=new google.maps.Map(document.querySelector(this.params.map),settings);
	},
	
	find : function(address){
		var geocoder=new google.maps.Geocoder();
		geocoder.geocode(
			{"address":address},
			function(data,status){
				if(status=='OK'){
					var destPos=data[0].geometry.location;
					localize.params.found.call(this,{latitude:destPos.lat(),longitude:destPos.lng()});
				} 
				else{
					localize.params.found.call(this,null);
				}
		});
	},
	
	markPos : function(pos){
		var latLng=new google.maps.LatLng(pos.latitude,pos.longitude);
		this.map.setCenter(latLng);
		new google.maps.Marker({position:latLng,map:this.map});
	},
	
	itinerary : function(miniMap,datas){
		var origin = new google.maps.LatLng(datas.userLoc.latitude, datas.userLoc.longitude);
		var destination = new google.maps.LatLng(datas.destLoc.latitude, datas.destLoc.longitude);
		var settings = {mapTypeId: google.maps.MapTypeId.ROADMAP};
		var bounds = new google.maps.LatLngBounds (origin,destination); 
		var map = new google.maps.Map(miniMap, settings);
		map.fitBounds(bounds);
		
		var display = new google.maps.DirectionsRenderer({map : map});
     var request = {origin : origin,destination : destination,travelMode : google.maps.DirectionsTravelMode.DRIVING}
     var itinerary = new google.maps.DirectionsService();
     itinerary.route(request, function(response, status){
				if(status == google.maps.DirectionsStatus.OK){
        		display.setDirections(response); 
     		}
   	 });
	}
	
};











