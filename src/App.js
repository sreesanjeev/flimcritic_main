import { Route, Routes } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useEffect } from "react";

import './App.css';
import fetchDataFromApi from './utils/fetchDataFromApi'
import { getGenres } from "./store/homeSlice";

import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import Search from './pages/search/Search'
import PageNotFound from './pages/pagenotfound/PageNotFound'
import Header from './components/header'
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  const dispatch = useDispatch()
  const data = []

  useEffect(() => {
      ['movie','tv'].map((endpoint)=>{
          fetchDataFromApi(`/genre/${endpoint}/list`)
          .then((res)=>{res.genres.forEach((x)=>data.push({'value':x.id,'label':x.name}))})
          .then(()=>{ if(endpoint == 'tv') dispatch(getGenres(data))
          })
          .catch((err)=>{console.log(err.message);})
        })
    },[])


  return (
    <div className="App">
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Search/:query" element={<Search />}/>
          <Route path="/explore/:mediaType" element={<Explore />}/>
          <Route path="/Details/:mediaType/:id" element={<Details />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>

    </div>
  );
}

export default App;
