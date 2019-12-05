const apiKey = "d6187e319b4415f903ef820315b84dae";

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let searchText = $('#searchText').val();
    var url = getUrl(searchText);
    getMovies(url);
  });
});

function renderTable(movies) {

  $("#dataTable").find("tbody").html("");
  var image = "";
  for (key in movies) {
    movie = movies[key];
    image = movie["poster"] ? "http://image.tmdb.org/t/p/w185" + movie["poster"] : "";
    $('#dataTable').append('<tr><td><img src="'+image+'"/></td><td>'+ movie.title+ '</td><td>'+movie.description+'</td><td>'+ movie.releaseDate+ '</td><td>'+ movie.rating+'</td></tr>');
  }
}

function getMovies(url) {
  $.getJSON({
    url: url,
    success: function(response) {
      var data = [];
      let movie;
      let movieData;
      for (key in response["results"]) {
        movie = response["results"][key];
        movieData = {
          title: movie["title"],
          poster: movie["poster_path"],
          releaseDate: movie["release_date"],
          rating: movie["vote_average"],
          description: movie["overview"]
        };

        data.push(movieData);
      }

      renderTable(data);
    },
    error: function(xhr,status,error){
      console.log(xhr),
      console.log(xhr.status);
      $('.error').html('Movie not found')
    }
  });
}

function getUrl(text) {
  let url = "https://api.themoviedb.org/3/search/movie?";
  var params = $.param({
    api_key: apiKey,
    query: text
  });

  url += params;
  return url;
}
