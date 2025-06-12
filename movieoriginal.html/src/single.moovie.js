
import React, { useState, useEffect } from "react";
import { useParams,NavLink } from "react-router-dom";
const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const SingleMovie = () => {
  const { id } = useParams();

  const [isloading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");
  // const [isError, setIsError] = useState({ show: "false", msg: "" });
  // const [query, setQuery] = useState("titanic");
  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
      console.log({data})
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    let timeerout = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`)
    },800)

    return () => clearTimeout(timeerout);
  }, [id]);

  if (isloading) {
    return (
      <div className="movie-section">
        <div className="loading">
          Loading...
        </div>

      </div>
    );
  }

  return <>
    <section className="movie-section">
      <div className="movie-card" >
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="card-text"><strong>imdbRating :</strong>{movie.imdbRating} / 10</p>
          <p className="card-text"><strong>Released :</strong>{movie.Released}</p>
          <p className="card-text"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="card-text"><strong>Country :</strong>{movie.Country}</p>
          <p className="card-text"><strong>Language :</strong>{movie.Language}</p>
          <p className="card-text"><strong>Summary :</strong>{movie.Plot}</p>
          <p className="card-text"><strong>Writer :</strong>{movie.Writer}</p>
          <p className="card-text"><strong>RunTime :</strong>{movie.Runtime}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  </>
};

export default SingleMovie;
