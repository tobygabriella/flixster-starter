import {useState} from "react";
import MovieList from "./MovieList";

function SearchScreen(){
    const[query, setSearchQuery]= useState('')
    const[movies, setMovies]= useState([]);
    const[pageNumber, setPageNumber]= useState(1)

    function handleSearch(searchQuery){
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU5YTZiOThlMTBjZDkyZTcxN2Y4OWIzZDYxYjdjNSIsInN1YiI6IjY2NjY1MTQ1Y2M3MDc0ZDliNjFjMWM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDf1-04fWbMoc-zzed3BAcZLflL14UG-mdjcZobVjxA'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`, options)
        .then(response => response.json())
        .then(response => setMovies(response.results))
        .catch(err => console.error(err));
    }

    function loadMore(){
      setPageNumber(prevPageNumber => prevPageNumber+1)

    }
     
    return(
      <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />
      <button onClick={() => handleSearch(query)}>Search</button>
      
      <MovieList data={movies} />
      <button onClick={loadMore}>Load more</button>

    </div>
    )
}

export default SearchScreen;