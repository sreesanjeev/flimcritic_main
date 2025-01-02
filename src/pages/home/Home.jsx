import React from "react";
import './home.css'
import Banner from './Banner'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'
import Header from "../../components/header";
import Filter from "../../components/Filter";

function Home(){
    return(
        <>
        <Header />
        <Banner />
        <Filter/>
        <Trending/>
        <Popular />
        <TopRated />
        </>
    )
}
export default Home