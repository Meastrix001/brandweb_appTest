import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Game, Platform, Store, Rating, Stores } from '../../types'
import MainContainer from "../components/MainContainer"

import Link from "next/link"
import { platform } from "os"
function DetailsPage() {
    const router = useRouter()
    const [gameData, setGameData] = useState<Game>()
    const [activeTab, setActiveTab] = useState("about")
    const getPlatform = (platformSlug: String) => {
        console.log(platformSlug)
        // switch (platformSlug) {
        //     case "xbox-one":
        //         return "xbox"
        //     case "xbox360":
        //         return "/xbox360.svg"
        //     case "pc":
        //         return "xbox"
        //     case "playstation5":
        //         return "/ps5.svg"
        //     case "playstation4":
        //         return "/ps4.svg"
        //     case "playstation3":
        //         return "/ps3.svg"
        //     case "ps-vita":
        //         return "xbox"
        //     case "nintendo-switch":
        //         return "xbox"
        //     case "nintendo-3ds":
        //         return "xbox"
        //     case "linux":
        //         return "xbox"
        //     case "wii-u":
        //         return "xbox"
        //     case "android":
        //         return "xbox"
        //     case "ios":
        //         return "xbox"
        //     case "macos":
        //         return "xbox"
        //         default:
        //         break;
        // }
    
    }

    useEffect(() => {
        const fetchData = async () => {
            if(router.query.slug) {
                const results = await fetch(`https://api.rawg.io/api/games/${router.query.slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
                const res = await results.json()
                setGameData(res)
                console.log(res)
                if(router.query.slug === undefined || res && res.id === undefined){
                    router.push("/")
                  }
            }
          }
          
          fetchData()
    }, [router.query.slug])
    

    return (
        <MainContainer>
            <div className="detailsGame">
                <div className="position-absolute backButton">
                    <h2 className="text-white d-flex align-items-center ps-2 pe-2 pt-2 mb-0">

                    <Link href="/">
                        <svg className="pe-1 backButton cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="circleArrowLeftIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="circleArrowLeftIconTitle">Arrow Left</title> <path d="M10.5 15l-3-3 3-3"/> <path d="M16.5 12H9"/> <path stroke-linecap="round" d="M7.5 12H9"/> <circle cx="12" cy="12" r="10"/> </svg>

                    </Link> 
                    {gameData?.name}
                    </h2>
                    <p className="m-auto p-1 text-white">released on {gameData?.released} by {gameData?.publishers[0].name}</p>
                </div>

                <div className="detailsGameBg">
                    <img className="" src={gameData?.background_image} alt="" />
                </div>

                <div className="p-2 container">
                    {/* TABS */}
                    <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button onClick={(e) => {setActiveTab("about")}} className={`text-white nav-link ${activeTab == "about" ? "show active" : ""}`} id="home-tab">About</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button onClick={(e) => {setActiveTab("info")}} className={`text-white nav-link ${activeTab == "info" ? "show active" : ""}`} id="profile-tab">Info</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button onClick={(e) => {setActiveTab("platforms")}} className={`text-white nav-link ${activeTab == "platforms" ? "show active" : ""}`} id="contact-tab">Platforms</button>
                      </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        {/* ABOUT TAB*/}
                      <div className={`mt-3 tab-pane fade ${activeTab == "about" ? "show active" : ""}`} >
                      <p className="text-white mb-0">Released on {gameData?.released} by {gameData?.publishers[0].name} </p>
                      <p className="text-white">Description:</p>
                      <p className="text-white p-1">{gameData?.description_raw}</p>
                      </div>

                        {/* INFO TAB */}
                      <div className={`mt-3 tab-pane fade ${activeTab === "info" ? "show active" : ""}`}>
                        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-evenly m-auto ">

                        <ul className="list-unstyled list-unstyled ratings">
                                <h3 className="text-white">What player think:</h3>

                                {gameData?.ratings.map((rating: Rating, index) => {
                                    return (
                                        <li className="ms-3" key={index}>
                                            <h3>{rating.title} <small className="text-white">{rating.percent}% </small></h3>
                                        </li>
                                    )
                                })}
                        </ul>

                        <ul className="list-unstyled">
                            <h3 className="text-white">To be found:</h3>
                                {gameData?.stores.map((store: Stores, index) => {
                                    return (
                                    <li className="" key={index}>
                                        <p className="ms-3 text-white mb-0">in {store.store.name} </p>
                                        <p className="ms-4 text-white mt-0">at: <a className="text-white text-decoration-underline" href={`https://www.`+ store.store.domain}>{store.store.domain}</a> </p>
                                        </li>
                                    )
                            })}
                        </ul>
                        </div>
                      </div>

                      {/* PLATFORM TAB*/}
                      <div className={`mt-3 tab-pane fade ${activeTab === "platforms" ? "show active" : ""}`}>
                        <ul className=" list-unstyled d-flex flex-column ">
                            {gameData?.platforms.map((platform: Platform, index) => {
                                if(platform.platform.slug){
                                    return (
                                        <li key={index}>
                                            <h5 className="text-white">{platform.platform.slug} since {platform.released_at} </h5>
                                            <p className="text-white">{platform.requirements.minimum}</p>
                                            <p className="text-white">{platform.requirements.recommended}</p>
                                        </li>
                                    )} 
                            })}
                        </ul>
                      </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            
        </MainContainer>
            

    )
   }
   export default DetailsPage