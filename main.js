var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var all = true;
var onlineOnly = false;
//-----------------------first action-----------------------
channels.forEach(getFile);

//-----------------------action when click------------------
$("#online").click(function(){
  all = false;
  onlineOnly = true;
  $("#result .container").empty();
  channels.forEach(getFile);
});
$("#offline").click(function(){
  all = false;
  onlineOnly = false;
  $("#result .container").empty();
  channels.forEach(getFile);
});
$("#all").click(function(){
  all = true;
  onlineOnly = false;
  $("#result .container").empty();
  channels.forEach(getFile);
});

//-----------------------function-----------------------
function getFile(channel){
  var url = "https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/" + channel + "/";
  $.getJSON(url,function(data){
    if(isOnline(data)){
      if(all || onlineOnly){
        updateList(channel,true);
      }
    }else{
      if(all || !onlineOnly){
        updateList(channel,false);
      }
      
    }
  });
}
        
function isOnline(data){
  if(data.stream == null) return false;  
  else return true; 
}

function updateList(channel, isOnline) {
  var url = "https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/channels/" + channel + "/";
  
  $.getJSON(url,function(data) {   
      if(isOnline){
        createCard(data,true);
      }else{
        createCard(data,false);
      }
   });
}

function createCard(data, status){ 
  var tag = "";
  if(status) tag = "online";
  else tag = "offline";
  var html = "";
  
  html += "<div class='card' id='" + tag + "'>";
  html +=   "<div class='img'>";
  html +=      "<a href='"+ data.url +"' target='_blank'><img src='"+ data.logo + "'></a>";
  html +=   "</div>"; 
  html +=   "<div class='name'>";
  html +=     "<h3><a href='"+ data.url +"' target='_blank'>"+ data.name + "</a></h3>";
  html +=     "<p class='description'>"+ data.status + "</p>";
  html +=   "<div>";
  html += "</div>";
  
  
  $("#result .container").append(html);
}
    




