import './details.css'

import { useParams } from 'react-router-dom'
import React, {useState} from "react"
import Img from '../../components/Img'
import FetchData from '../../hooks/FetchData'
import {BannerSkeleton,ImgSkeleton} from '../../components/Skeleton'
import dayjs from 'dayjs'
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from '../../components/Card'

import {PlayIcon} from '../../assets/PlayIcon'

import VideoPopUp from '../../components/videoPopUp'


import { useSelector, useDispatch } from 'react-redux'
import {getApi} from '../../store/homeSlice'
import Header from '../../components/header'

function Details(){
   const {id,mediaType} = useParams()
   const {data, loading} = FetchData(`/${mediaType}/${id}`)
   const credits = FetchData(`/${mediaType}/${id}/credits`)
   const video= FetchData(`/${mediaType}/${id}/videos`);
   const similarMovie= FetchData(`/${mediaType}/${id}/similar`);
   const Recommendations= FetchData(`/${mediaType}/${id}/recommendations`);

   const dispatch = useDispatch()
   
   const [isVisible, setIsVisible] = useState(false);
   const [videoId, setVideoID] = useState(false);
   const [apiErr, setApiErr] = useState('')

   const [apiInput, setApiInput] = useState("")

   const handleToggle = () => {
     setIsVisible(!isVisible);
   };

   const UsersApiKey = useSelector((state) => state.home.API_KEY)

   const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const submitAPIKey = (e) =>{
  e.preventDefault();
  if(apiInput.length == 51 && apiInput.startsWith("sk-"))
     {
      dispatch(getApi(apiInput))
      
   }

   else{
      setApiErr("invalid api key")
   }
  }

   return (

      <>
              <Header />

      {/* <p>{video?.data?.results?.[0].key}</p> */}
      {isVisible ?<VideoPopUp handleToggle={handleToggle} videoId={videoId}/>: ""}
      <div className='details'>
         {/* background */}
         <div className='mask1' />
         <div className='mask2' />
         <div className="banner_image">{loading ? <BannerSkeleton/> : <Img url={data?.backdrop_path} alt="Banner image" />}</div>

         {/* details */}
         <div className='Details_banner'>
            <div className='details_poster'>
               {loading ? <ImgSkeleton/> : <Img url={data?.backdrop_path} alt="Banner image" />}
            </div>
            <div className='details_contents'>
               <div className="details_title">
                     {`${data && data?.title || data?.name  } (${dayjs(data?.release_date ).format("YYYY")})`}
               </div>
               <div className="details_subtitle">
                  {data?.tagline}
               </div>
               <div className="detail_tabs">
                  <div className="rating">
                     <CircularProgressbar
                        maxValue={10} 
                        value={data?.vote_average} 
                        background
                        backgroundPadding={6}
                        styles={
                              buildStyles({
                                 backgroundColor: 'transparent',
                                 textColor: "#fff",
                                 pathColor: `${data?.vote_average > 8.5 ? "#74bd5d" : data?.vote_average < 3.0 ? "#FF3B28" : "#f7ad19"}`,
                                 trailColor: "transparent",
                                 textSize: '20px'
                              })
                        } 
                        text={`${data?.vote_average && (data?.vote_average).toFixed(1)}`}/>
                  </div>
                  <div className='video_button' onClick={() => { handleToggle(); setVideoID(video?.data?.results?.[0].key) }}>
                     {video?.data?.results?.[0] && <PlayIcon className="videoButton" />}
                     {isVisible ?<VideoPopUp handleToggle={handleToggle} videoId={video?.data?.results?.[0].key}/>: ""}
                  </div>
               </div>
               <div className="overview">
                  <h1>Overview</h1>
                  <p>{data?.overview ? <span className="res">{data?.overview}</span> : <span className="res">{" "}</span>}</p>
               </div>
               <div className="status">
                  <p>status: {data?.status ? <span className="res">{data?.status}</span> : <span className="res">{" "}</span>}</p>
                  <p>Runtime: {data?.runtime ? <span className="res"> {toHoursAndMinutes(data?.runtime)}</span> : <span className="res">{" "}</span>}</p>
                  <p>release_date: {data?.release_date ? <span className="res"> {dayjs(data?.release_date).format("MMM D, YYYY")}</span> : <span className="res">{" "}</span>}</p>
               </div>
               <div className="director">
                  <p>Director: {credits?.data?.crew ? credits?.data?.crew?.filter((x)=>x.job == "Director")
                                                                         .map((x,i)=> {return <span className="res">{i > 0 ? ", " : ""}{x.name}</span>})
                                                   : <span className="res">{" "}</span>}</p>
               </div>
               <div className="writer">
                  <p>writer: {credits?.data?.crew ? credits?.data?.crew?.filter((x)=> x.job === "Screenplay" || x.job === "Story" || x.job === "Writer")
                                                                       .map((y,i)=> {return  <span className="res">{i > 0 ? ", " : ""}{y.name}</span>})
                                                   : <span className="res">{" "}</span>}</p>

               </div>
            </div>
         </div>
      </div>
      <div className='casts_container'>
      {similarMovie?.data?.results?.[0] && <div className="popular" >
         <h6>Similar Movies</h6>
        <div className={`cards`}>
            {similarMovie?.data?.results?.map((result, i) => <Card result={result} mediaType={mediaType} key={i}/>) }
        </div>
      </div>}
     {Recommendations?.data?.results?.[0] && <div className="Recommendations" >
         <h6>Recommendations</h6>
        <div className={`cards`}>
            {Recommendations?.data?.results?.map((result, i) => <Card result={result} mediaType={mediaType} key={i}/>) }
        </div>
      </div>}
      </div>
      </>
   )
}
export default Details