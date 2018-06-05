var tempCel;
var tempFlag;

$(document).ready(function(){
  locationCoord();
  $("#unitsButton").on('click', function(){
    unitChange();
  });
});

function locationCoord (){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      getWeather(position.coords.latitude, position.coords.longitude);
     });
  }
  else alert("We couldn't get your location :(");
};

function getWeather(lat, lon){
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=72aa6ce690ea868708ee3867bf12799c&units=metric&callback=?").done(function(json){
    $("#loca").html(json.name + ", " + json.sys.country);
    $("#desc").html(json.weather[0].main);
    $("#icon").html('<img src= "http://openweathermap.org/img/w/' + json.weather[0].icon + '.png"></img>');
    $("#temp").html(json.main.temp + " " + String.fromCharCode(176) + "C");
    tempCel = json.main.temp;  
    tempFlag = true;
  }).fail(function(){
    alert("Weather api doesn't seem to be working. Please try later!");
  });
};

function unitChange(){
  if(tempFlag){
    var tempFahr = Math.round(tempCel * 9 / 5 + 32);
    $("#temp").html(tempFahr + " " + String.fromCharCode(176) + "F");
    tempFlag = false;
  }
  else if (!tempFlag){
    $("#temp").html(tempCel + " " + String.fromCharCode(176) + "C");
    tempFlag = true;
  }
  else alert("The button broke! Reload the page, please.");
};
