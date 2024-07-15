import { HeaderProps } from "../types"

export const Header: React.FC<HeaderProps>= ({genreList,setGenreHandler,activeGenre}) => {
  return (
    <header className='container position-sticky top-0 header-container'>
    <h1 className='mt-0'>MOVIEFIX</h1>
    <div className="genre-nav ">
    {genreList.map((genre, index) => (
      <button 
        key={index} 
        className={genre.id === activeGenre ? 'active' : ''}
        onClick={() => setGenreHandler(genre.id)}
      >
        {genre?.name}
      </button>
    ))}
  </div>
  </header>
  )
}