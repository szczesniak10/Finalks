$(document).ready(() => {
    var url = getUrl();
    getMovies(url);
});

function getUrl() {
  let url = "https://api.themoviedb.org/3/movie/top_rated?";
  var params = $.param({
    api_key: apiKey
  });

  url += params;
  return url;
}
