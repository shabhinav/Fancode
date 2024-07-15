export interface Movie {
    title: string;
    image: string;
    vote_average: number;
    backdrop_path:string
  }
  
  export  interface MovieGridProps {
    moviesList: MoviesList;
    activeGenre: number;
  }
  
  export  interface MoviesList {
    [genre: string]: {
      [year: string]: Movie[]
    }
  }
  
  export  interface MovieCardProps {
    movie: Movie;
  }