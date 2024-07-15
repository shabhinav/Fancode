import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { MovieGrid } from './Component/Movies/MovieGrid';
import { SkeletonCard } from './Component/Movies/MovieCardLoader';
import { Header } from './Component/Header/Header';

const App: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [genreList,setGenreList]= useState([]);
  const [loading,setLoading]=useState(false)
  const [moviesList,setMoviesList]=useState({
  })
  const currentYear=useRef(2011)

  useEffect(()=>{
    getGenreListHandler()
  },[])

  useEffect(() => {
    const target = document.getElementById("loadmore");
     if(activeGenre > -1 && target){
      try {
        const observer = new IntersectionObserver((entries) => {
          if(currentYear.current+1 > new Date().getFullYear()){
            observer.unobserve(target);
          }
          if (entries[0].isIntersecting ) {
            currentYear.current=currentYear.current+1
            getMoviesListHandler(currentYear.current)
          }
        },{
          rootMargin: "50px",
        });
        if (target) {
          observer.observe(target);
        }

        return () => {
          if (target) {
            observer.unobserve(target);
          }
        };
      } catch (error) {
        console.log(error)
      }
     }
  }, [activeGenre,moviesList]);


  const getMoviesListHandler=async(year:number)=>{
    setLoading(true)
    try{
      let { data:{results} }=await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${activeGenre}`)
      let moviesListClone=JSON.parse(JSON.stringify(moviesList))
      if (!moviesListClone.hasOwnProperty(activeGenre)) {
        moviesListClone[activeGenre] = {};
      }
      moviesListClone[activeGenre][year] = results;
      setMoviesList(moviesListClone)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  
  const getGenreListHandler=async()=>{
    try{
      const url = `${import.meta.env.VITE_BASE_URL}/genre/movie/list?language=en`;

      const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
        }
      };
    
    const {data:{genres}} =await axios(options)
    setGenreList(genres)
    setActiveGenre(genres[0].id)
    }
    catch (err){
      console.log(err)
    }
  }

  const setGenreHandler=(value:number)=>{
    currentYear.current=2011
    setActiveGenre(value)
    window.scrollTo(0,0)
  }

  return (
    <div className="app">
      <Header genreList={genreList} setGenreHandler={setGenreHandler} activeGenre={activeGenre}/>
      <main className='container pt-0'>
        <MovieGrid moviesList={moviesList} activeGenre={activeGenre}/>
        <div className="movie-grid">
        {loading && Array(4).fill(null).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </main>
      {currentYear.current+1 < new Date().getFullYear() && <div className='hidden'  id='loadmore'>loadmore</div>}
    </div>
  );
};

export default App;