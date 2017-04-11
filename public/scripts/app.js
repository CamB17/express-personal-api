console.log("Sanity Check: JS is working!");
var template;
var $moviesList;
var allMovies = [];

$(document).ready(function(){

	$moviesList = $('#moviesTarget');

var source = $('#movies-template').html();
template = Handlebars.compile(source);



$.ajax({
    method: 'GET',
    url: '/api/movies',
    success: onSuccess,
    error: onError
});

$.ajax({
  method: 'GET'
  url: '/api/profile',
  success: profileSuccess,
  error: profileError
  });
});

$('#newMovieForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new movie serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/movies',
      data: $(this).serializeArray(),
      success: newMovieSuccess,
      error: newMovieError
    });
  });

$moviesList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/movies/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/movies/'+$(this).attr('data-id'),
      success: deleteMovieSuccess,
      error: deleteMovieError
    });
  });

function render() {
  $moviesList.empty();
  var moviesHtml = template({ movies: allMovies });
  $moviesList.append(moviesHtml);
}

function onSuccess(json) {
  allMovies = json;
  render();
}

function onError(e) {
  console.log('not working!');
  $('#moviesTarget').append('Failed to load movies, is the server working?');
}


function profileSuccess(json) {
 +$('#profileTarget').append('<h1>' + json[0].name + '</h1><img src="' +
  json[0].github_profile_image + 'target="_blank" id="profile"><hr><i class="fa fa-github-square"></i>' + ' <a href="' +
  json[0].github_link + '">CamB17</a><br><i class="fa fa-home"></i> ' +
  json[0].current_city + '<br><br><i class="fa class="fa fa-movies"></i><br><ul>' +
  json[0].favorite_movies.join('<br>') + '</ul><hr>');
 
 }

 function profileError(e) {
  console.log('not working!');
  $('#profileTarget').append('Failed to load movies, is the server working?');
}

function newMovieSuccess(json) {
  $('#newMovieForm input').val('');
  allMovies.push(json);
  render();
}

function newMovieError() {
  console.log('uh ohhhhh');
  $('#movieTarget').append('Failed to load movies, is the server working?');
}

function deleteMovieSuccess(json) {
  var album = json;
  console.log(json);
  var movieId = movie._id;
  console.log('delete movie', movieId);
  // find the movie with the correct ID and remove it from our allMovies array
  for(var index = 0; index < allMovies.length; index++) {
    if(allMovies[index]._id === movieId) {
      allMovies.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteMovieError() {
  console.log('delete movie error!');
}
