var page = 0;

function getMeeting(){
	clearBox(); //Clear old results
	var q = constructQ(0);
	page = page + 1;
	console.log(q);

	$.ajax({

		url : q,
		
		success : function(data) {
			console.log(data);
		},
		error : function(){
			console.log("error");
		},
		dataType:'json',
		'success' : function(data) {
			var output = prettyPrint(data);
			console.log(data);
			var resultsLength = data['tracks']['items'].length; 
			if(resultsLength == 0){
				$("#songResults").append("<p>No results are found based on this search.</p>").append("<p>Please use fewer keywords.</p>");
			}


			for(j = 0; j < data['tracks']['items'].length; j++){
				var song_name = data['tracks']['items'][j]['name'];
				var play_url = data['tracks']['items'][j]['preview_url'];
				console.log(play_url);

				var all_artist_name = data['tracks']['items'][j]['artists'][0]['name'];
				var artist_name_arr = data['tracks']['items'][j]['artists'];


				for(i = 1; i<artist_name_arr.length; i++){
					all_artist_name = all_artist_name + ",  " + artist_name_arr[i]['name'];
				}

				$("#songResults").append("<div id=\"perSongResult\"><p>"  + song_name  +"---"+ all_artist_name+"</p>").append("<audio id=\"audio\" src=" + play_url+ "></audio>").append("<input type=\"button\" value=\"PLAY\"  onclick=\"play()\"><input type=\"button\" value=\"PAUSE\"  onclick=\"pause()\"></div>");

				

				if(j == 9){
					$("#songResults").append("<input type=\"button\" value=\"Next Ten Results\" id=\"meetinginbox\" onclick=\"nextPage();\"> ");
				}
			}

		}
	});
		scrollBox();
}


function scrollBox(){	
	$('#box').slideDown('fast');
}

function clearBox(){
	$('#songResults').empty();
}

function play(){
       var audio = document.getElementById("audio");
       console.log(audio);
       audio.play();
}
function pause(){
       var audio = document.getElementById("audio");
       audio.pause();
}
//function used to construct url
var constructQ = function(number) {
	var q = "https://api.spotify.com/v1/search?q=";
	var songName = document.getElementById('songName_search').value;
	var artist = document.getElementById('artist_search').value;
	var albumName = document.getElementById('albumName_search').value;
	var genre = document.getElementById('genre_search').value;
	var year = document.getElementById("timedropdown").value;

	if(artist != ""){
		q = q + "%20artist:" + artist;
	}
	if(songName != ""){
		q = q + "%20track:" + songName;
	}
	if(albumName != ""){
		q = q + "%20album:" +  albumName;
	}
	if(genre != ""){
		q = q + "%20genre:" + genre;
	}
	if(year != ""){
		q = q + "%20year:" + year;
	}
	q = q + "&type=track&limit=10&offset=" + (number*10).toString();
    
    return q;
};

function nextPage(){
	clearBox(); //Clear old results
	console.log(page);
	var q = constructQ(page);
	page = page + 1;
	console.log(q);

	$.ajax({

		url : q,
		
		success : function(data) {
			console.log(data);
		},
		error : function(){
			console.log("error");
		},
		dataType:'json',
		'success' : function(data) {
			var output = prettyPrint(data);
			console.log(data);
			var resultsLength = data['tracks']['items'].length; 
			if(resultsLength == 0){
				$("#songResults").append("<p>No results are found based on this search.</p>").append("<p>Please use fewer keywords.</p>");
			}


			for(j = 0; j < data['tracks']['items'].length; j++){
				var song_name = data['tracks']['items'][j]['name'];
				var play_url = data['tracks']['items'][j]['preview_url'];

				var all_artist_name = data['tracks']['items'][j]['artists'][0]['name'];
				var artist_name_arr = data['tracks']['items'][j]['artists'];


				for(i = 1; i<artist_name_arr.length; i++){
					all_artist_name = all_artist_name + ",  " + artist_name_arr[i]['name'];
				}

				$("#songResults").append("<div id=\"perSongResult\"><p>"  + song_name  +"---"+ all_artist_name+"</p>").append("<audio id=\"audio\" src=" + play_url+ "></audio>").append("<input type=\"button\" value=\"PLAY\"  onclick=\"play()\"><input type=\"button\" value=\"PAUSE\"  onclick=\"pause()\"></div>");


				if(j == 9){
					$("#songResults").append("<input type=\"button\" value=\"Next Ten Results\" id=\"meetinginbox\" onclick=\"nextPage();\"> ");
				}
			}

		}
	});
		scrollBox();
}


function handleResponse(){
	console.log("response handled");
}