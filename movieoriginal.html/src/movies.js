
import React from 'react';
import {NavLink, useParams} from "react-router-dom";
import { useGlobalContext } from './context';

const Movies = () => {
    const {id} = useParams();
    const { movie,isloading } = useGlobalContext();
    if (isloading) {
        return (
          <div className="movie-section">
            <div className="loading">
              Loading...
            </div>
    
          </div>
        );
      }
      console.log({id});
    return (
        
            <section className='movie-page'>
                <div className='grid grid-4-col'>
                    {
                        movie.map((curMovie) => {
                            const {imdbID , Title , Poster} = curMovie;
                            const movieName = Title.substring(0,15);
                            return (
                                <NavLink className='movie' to={`movie/${imdbID}`} key={imdbID}>
                                    <div className='card'>
                                        <div className='card-info'>
                                            <h2 className='moviename'>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                                            <img className='image' src={Poster}  alt={imdbID} />
                                        </div>
                                    </div>

                                </NavLink>
                            )
                         } )
                    }
                </div>
            </section>
        
    )
}

export default Movies;
