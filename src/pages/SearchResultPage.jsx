import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {ResultVideoCard} from '../components/index.jsx'
import {LoadingBarContext} from '../contexts/index.jsx'

function SearchResultPage(){
    const location = useLocation()
    const {query} = location.state || ""

    const [searchedvideos , setSearchedVideos] = useState([])

    const {setProgress} = useContext(LoadingBarContext)

    useEffect(()=>{
        const fetchsearchedvideos = async ()=>{
            setProgress(30)
            const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/videos/all/?page=1&limit=10&sortBy=title&sortType=asc&query=${query}`,{
                method : "GET",
                headers : {
                    'Content-Type' : 'application/json',
              }
            })
            .then(response => response.json())
            .catch(error => console.log(error))
            setProgress(50)

            if (response && response.success){
                console.log(response.data)
                setSearchedVideos(response.data)
            }
            setProgress(100)
        }
        fetchsearchedvideos()
    },[query])

  return (
    <div className='page-container'>
      <div className="scroll-list-panel">
      {
        searchedvideos.map((video)=>{
            return <ResultVideoCard key = {video._id} videodetails={video}/>
        })
      }
      {
        searchedvideos.length === 0 ? <div className="empty-state">No Videos Matched</div> : ""
      }
      </div>
    </div>
  )
}

export default SearchResultPage
