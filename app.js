        $(document).ready(function(){
              // alert("Welcome to movie database...")
                $('#searchForm').on('submit', (e) => {
                      //console.log($('#searchForm').val());
                      let searchText = $('#searchText').val();
                      getMovies(searchText);
                      e.preventDefault();
                });
        });

        function getMovies(searchText){
              //console.log(searchText);
                axios.get('http://www.omdbapi.com?s=' + searchText+ '&apikey=thewdb') //axios.get('http://www.omdbapi.com?i='+ movieId)
                          .then((response) => {
                                console.log(response);
                                let movies = response.data.Search;
                                let output = '';
                                $.each(movies, (index, movie) => {
                                        output += `
                                                            <div class="col-md-3">
                                                                <div class="well text-center">
                                                                    <img src="${movie.Poster}">
                                                                    <h5>${movie.Title}</h5> <br><br>
                                                                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                                                </div>
                                                            </div>
                                                            `;
                                });

                                $('#movies').html(output);
                          })
                          .catch((err0r) => {
                                console.log(err0r);
                          });
        }

        function movieSelected(id){
                sessionStorage.setItem('movieId', id);
                window.location = 'movie.html';
                return false;
        }

        function getMovie(){
              let movieId = sessionStorage.getItem('movieId');

              axios.get('http://www.omdbapi.com?i=' + movieId+ '&apikey=thewdb')
                        .then((response) => {
                              console.log(response);
                              let movie = response.data;

                              let output = `
                                                      <div class="row">
                                                          <div class="col-md-4">
                                                            <img src="${movie.Poster}" class="thumbnail">
                                                          </div>
                                                          <div class="col-md-8">
                                                                <h2>${movie.Title}</h2>
                                                                    <ul class="list-group">
                                                                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                                                                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                                                                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                                                                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                                                                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                                                                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                                                                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                                                                      </ul>
                                                          </div>
                                                      </div>
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                  <h3>Plot</h3>
                                                                  ${movie.Plot}
                                                                  <hr>
                                                                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Go to page in IMDB</a>
                                                                  <a href="index.html" class="btn btn-default">Go back</a>
                                                            </div>
                                                          </div>
                                                    `;

                                                    $('#movie').html(output);
                        })
                        .catch((err0r) => {
                              console.log(err0r);
                        });
        }
