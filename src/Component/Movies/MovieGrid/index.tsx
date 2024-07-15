import { MovieCard } from "../MoviesCard/Index";
import { MovieGridProps } from "../types";

export const MovieGrid: React.FC<MovieGridProps> = ({ moviesList, activeGenre }) => {
    return (
      <div>
        {moviesList?.[activeGenre] && Object.entries(moviesList[activeGenre]).map(([year, movies]) => (
          <div key={year}>
            <h2 className='year_heading'>{year}</h2>
            <div className="movie-grid">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
              ))}
              </div>
          </div>
        ))}
      </div>
    );
  };
