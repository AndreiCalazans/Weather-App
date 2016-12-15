navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  $("#data").html("lat: "+ lat +"<br/>" +"Long: "+ long);
  unit = "F";
  go(lat,long);
});

function setIcon(status){

  switch(status){
    case 'rain': $('#icon').append('<i class="wi wi-rain"></i>');
$('body').css('background-image','url("http://pexels.imgix.net/photos/1551/field-thunderstorm-rainy-meadow.jpg?fit=crop&w=1600&h=853")');
     break;
          case 'partly-cloudy-day': $('#icon').append('<i class="wi wi-cloudy"></i>');
$('body').css('background-image','url("http://pexels.imgix.net/photos/1551/field-thunderstorm-rainy-meadow.jpg?fit=crop&w=1600&h=853")');
     break;
    case 'clear-day':$('#icon').append('<i class="wi wi-day-sunny"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/3032/summer-ray-of-sunshine-bikes-bicycles.jpg?fit=crop&w=1600&h=853")')
    break;
    case 'cloudy':$('#icon').append('<i class="wi wi-cloudy"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/2083/city-clouds-cloudy-ray-of-sunshine.jpg?fit=crop&w=1600&h=853")')
    break;
         case 'thunderstorm':$('#icon').append('<i class="wi wi-thunderstorm"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/2271/clouds-cloudy-field-meadow.jpg?fit=crop&w=1600&h=853")')
    break;
               case 'snow':$('#icon').append('<i class="wi wi-snow"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/2377/snow-black-and-white-street-winter.jpg?fit=crop&w=1600&h=853")')
    break;
                     case 'fog':$('#icon').append('<i class="wi wi-fog"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5230/road-fog-foggy-mist.jpg?fit=crop&w=1600&h=853")')
    break;
                          case 'fog':$('#icon').append('<i class="wi wi-fog"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5230/road-fog-foggy-mist.jpg?fit=crop&w=1600&h=853")')
    break;
                           case 'sleet':$('#icon').append('<i class="wi wi-sleet"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5281/city-sky-skyline-australia.jpg?fit=crop&w=1600&h=853")')
    break;
      case 'clear-night':$('#icon').append('<i class="wi wi-night-clear"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5281/city-sky-skyline-australia.jpg?fit=crop&w=1600&h=853")')
    break;
      case 'day-sunny':$('#icon').append('<i class="wi wi-clear-day"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5281/city-sky-skyline-australia.jpg?fit=crop&w=1600&h=853")')
    break;
      case 'strong-wind':$('#icon').append('<i class="wi wi-wind"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5281/city-sky-skyline-australia.jpg?fit=crop&w=1600&h=853")')
    break;
      case 'partly-cloudy-day':$('#icon').append('<i class="wi wi-day-cloudy"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5281/city-sky-skyline-australia.jpg?fit=crop&w=1600&h=853")')
    break;
  }

}




function go(lat , long){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url:"https://api.darksky.net/forecast/65f6706af404cadabb8535d6b7992670/"+lat+ "," + long,
    success: function(json){
      temp = json.currently.apparentTemperature;
      status = json.currently.icon;
      setIcon(status);
      google(lat,long);
    }
  });
}

function google(lat,long){
$.ajax({
  type: "GET",
  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," + long,
  success: function(json){
         loc = json.results[0].formatted_address;
    $('#location').text(loc);
    $('#temperature').text(temp);
    $('#status').text(status);
  }
});
}

function convert(){
  if (unit == "F"){
    unit = "C";
    temp = Math.round(((temp-32)*5/9)*100)/100;
    $('#temperature').text(temp);
    $('#unit').text("°"+unit);
  }else if (unit == "C"){
    unit = "F";
    temp = Math.round((temp*(9/5)+32)*100)/100;
    $('#temperature').text(temp);
    $("#unit").text("°"+unit);
  }
}
