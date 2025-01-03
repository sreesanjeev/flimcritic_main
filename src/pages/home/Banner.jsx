import React, { useEffect, useState } from "react"
import Img from '../../components/Img'
import FetchData from '../../hooks/FetchData'
import {useNavigate} from 'react-router-dom'

function Banner(){
    const { data, err, loading } = FetchData(`/movie/upcoming?&with_original_language=ta`)
    const [image, setImage]=useState('')
    const [value, setValue] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        setImage(data && data?.results[Math.floor(Math.random() * data?.results?.length)]?.backdrop_path)
    },[data])
    
    return (
    <div className="banner">
        {<Img url={image} alt="Banner image" />}
        <div className="mask"></div>
        <div className="banner_contents">
            <h2>welcome.</h2>
            <p>Explore now.</p>
            <form className="input_feild" onSubmit={(e) => {e.preventDefault();navigate(`/search/${value}`); setValue("")}}>
                <input placeholder="    Search for a movie, tv show, person" value={value} onChange={(e) => (setValue(e.target.value))}></input>
                <button type="submit">search</button>
            </form>
        </div>
    </div>)
}
export default Banner