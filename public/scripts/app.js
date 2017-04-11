console.log("Sanity Check: JS is working!");
template = Handlebars.compile(source);

$(document).ready(function(){

$.ajax({
	method: 'GET'
	url: '/api/profile',
	success: profileSuccess,
	error: profileError
	});
});

function profileSuccess(json) {
 +$('#profileTarget').append('<h1>' + json[0].name + '</h1><img src="' +
  json[0].github_profile_image + 'target="_blank" id="profile"><hr><i class="fa fa-github-square"></i>' + ' <a href="' +
  json[0].github_link + '">CamB17</a><br><i class="fa fa-home"></i> ' +
  json[0].current_city + '<br><br><i class="fa fa-heart"></i><i class="fa fa-movies"></i><br><ul>' +
  json[0].favorite_movies.join('<br>') + '</ul><hr>');
 
 }
