import { MovieCardProps } from "../types";

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) =>  {
    const backdropUrl = getBackdropUrl(movie.backdrop_path);

    return <div className="movie-card">
      <div className="movie-image" style={{backgroundImage: `url(${backdropUrl})`}}>
        <div className="movie-info">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-rating">Rating: {movie.vote_average.toFixed(2)}</div>
        </div>
      </div>
    </div>
  };

  function getBackdropUrl(backdropPath: string, size: string = 'w1280'): string {
    if (!backdropPath) {
      return ''; // or a default image URL
    }
    return `${BASE_IMAGE_URL}${size}${backdropPath}`;
  }