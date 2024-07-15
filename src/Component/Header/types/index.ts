export interface Genre {
    id: number ;
    name: string;
  }
  
export interface HeaderProps {
    genreList: Genre[];
    setGenreHandler: (value: number) => void;
    activeGenre: number;
  }
  