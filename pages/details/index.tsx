import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Game, Platform, Store, Rating, Stores, Screenshots, Screenshot, Tag, Genre, Developers, Publisher, Additions, Result, Series } from '../../types'
import MainContainer from "../components/MainContainer";
import HashLoader from "react-spinners/HashLoader";

import Link from "next/link"
import { platform } from "os"
function DetailsPage() {
    const router = useRouter()
    const [gameData, setGameData] = useState<Game>()
    const [gameScreenshots, setScreenshots] = useState<Screenshots>()
    const [gameAdditions, setGameAdditions] = useState<Additions>()
    const [gameSeries, setGameSeries] = useState<Series>()
    const [activeTab, setActiveTab] = useState("about")
    const [currentImgModalToggle, setCurrentImgModalToggle] = useState(false)
    const [currentImgModal, setCurrentImgModal] = useState(0)
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
                if(res){
                    console.log(res)
                    setGameData(res)
                    getGameSeries(res.id)
                    getScreenshots(res.id)
                    getGameAddons(res.id)
                }
                if(router.query.slug === undefined || res && res.id === undefined){
                    router.push("/")
                  }
            }
          }
          
          fetchData()
    }, [router.query.slug])
    
    const getScreenshots = async (id: number) => {
        const results = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
        const res = await results.json()
        return (
            setScreenshots(res) 
        )
    }

    const getGameAddons = async (id: number) => {
        const results = await fetch(`https://api.rawg.io/api/games/${id}/additions?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
        const res = await results.json()
        return (
            setGameAdditions(res) 
        )
    }

    const getGameSeries = async (id: number) => {
        const results = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
        const res = await results.json()
        return (
            setGameSeries(res) 
        )
    }

    return (
        <MainContainer> 
            <div>
                <div className={`${gameData ? "" : "d-none"} detailsGame`} >
                    <div className="position-absolute backButton">
                    <h2 className="text-white d-flex align-items-center ps-2 pe-2 pt-2 mb-0">

                    <Link href="/">
                        <svg className="pe-1 backButton cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="circleArrowLeftIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="circleArrowLeftIconTitle">Arrow Left</title> <path d="M10.5 15l-3-3 3-3"/> <path d="M16.5 12H9"/> <path stroke-linecap="round" d="M7.5 12H9"/> <circle cx="12" cy="12" r="10"/> </svg>

                    </Link> 
                    {gameData?.name}
                    </h2>
                    <p className="m-auto p-1 text-white">released on {gameData?.released} by {gameData?.publishers[0]?.name}</p>
                    </div>
        
                    {/* IMG MODAL */}
                    <div className={` ${currentImgModalToggle ? "modal d-block ms-auto" : "modal"}`}>
                    <div className="modal-content m-auto position-fixed top-50 bottom-50">
                        <img onClick={(e) => {setCurrentImgModalToggle(false)}} id="img01" src={gameScreenshots?.results[currentImgModal].image} />
                        <ul className="d-flex justify-content-evenly list-unstyled">
                            <li className={`${currentImgModal === 0 ? "d-none"  : ""}`}>
                                <button onClick={(e) => {setCurrentImgModal(currentImgModal -1)}} className="bg-light m-1 rounded text-white border-0 p-2 cursor-pointer">Previous</button>
                            </li>

                            <li>
                                <button className="bg-light rounded m-1 text-white border-0 p-2 ">{(currentImgModal +1) + "/" + gameScreenshots?.results.length} </button>
                            </li>

                            <li className={`${gameScreenshots?.results.length === currentImgModal +1 ? "d-none"  : ""}`}>
                                <button onClick={(e) => {setCurrentImgModal(currentImgModal +1)}} className="bg-light m-1 rounded text-white border-0 p-2 cursor-pointer">Next</button>
                            </li>
                            <li>
                                <button onClick={(e) => {setCurrentImgModalToggle(false)}} className="bg-light m-1 rounded text-white border-0 p-2 cursor-pointer">Close</button>
                            </li>
                        </ul>
                    </div>
                    </div>

                    <div className="detailsGameBg">
                    <img className="" src={gameData?.background_image} alt="" />
                    </div>

                    <div className="p-2 container">
                    {/* TABS */}
                    <div>
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
                      <p className="text-white mb-0">Released on {gameData?.released} by {gameData?.publishers[0]?.name} </p>
                      <p className="text-white">Description:</p>
                      <p className="text-white p-1">{gameData?.description_raw}</p>
                      </div>

                        {/* INFO TAB */}
                      <div className={`mt-3 tab-pane fade ${activeTab === "info" ? "show active" : ""}`}>
                        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-evenly m-auto ">

                        <ul className="list-unstyled list-unstyled ratings">
                                <h3 className="text-white">What players think:</h3>

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
                                        
                                        {/* @ts-ignore: TBF, "name" does not exist in type store. But it does, works local/not hosted */}
                                        <p className="ms-3 text-white mb-0">in {store.store.name} </p>
                                        {/* @ts-ignore: TBF, "domain" does not exist in type store. But it does, works local/not hosted */}
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

                    {/* MEDIA */}
                    <div className="mb-4">
                        <ul className="row list galery container list-unstyled p-0 m-0" data-masonry='{"percentPosition": true}'>
                            {gameScreenshots?.results.map((screenshot: Screenshot,
                            index: number) => {
                                return(
                                    <li className="col-4 p-0" key={index}>
                                        <img onClick={(e) => {setCurrentImgModal(index), setCurrentImgModalToggle(true)}} className="cursor-pointer img-thumbnail" key={index} src={screenshot.image} alt="" />
                                    </li>
                                )
                                })}
                            </ul>
                    </div>

                    {/* MORE GAME INFO */}
                    <div>
                        <div className="d-flex row flex-wrap">

                             {/* TAGS */}
                            <div className="col-6 col-md-4 col-lg-3">
                            <p className="text-light mb-1">Tags</p>
                            <ul className="d-flex flex-wrap list-unstyled">
                                {gameData?.tags.map((tag: Tag, index: number) => {
                                    return (
                                        <li key={tag.id}>
                                            <Link href={`/search?tag=${tag.slug}`}>
                                                <p className="cursor-pointer mb-0 text-white ms-1 me-1">{tag.name} ·</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            </div>
                            
                            {/* GENRE, AGE, DEVELOPERS, PUBLISHERS */}
                            <div className="col-6 col-md-4 col-lg-3">

                                {/* GENRE */}
                                <p className="text-light mb-1">Genres</p>
                                <ul className="d-flex flex-wrap list-unstyled">
                                {gameData?.genres.map((genre: Genre, index: number) => {
                                    return (
                                        <li key={genre.id}>
                                            <Link href={`/search?genre=${genre.slug}`}>
                                                <p className="cursor-pointer mb-0 text-white ms-1 me-1">{genre.name}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                                </ul>

                                {/* AGE */}
                                <p className="text-light mb-1">Age rating</p>
                                <ul className="d-flex flex-wrap list-unstyled">
                                <li key={gameData?.esrb_rating?.id}>
                                    <Link href={`/search?slug=${gameData?.esrb_rating?.slug}`}>
                                        <p className="mb-0 text-white ms-1 me-1">{gameData?.esrb_rating?.name == "Mature" ? "17+" : ""} {gameData?.esrb_rating?.name} </p>
                                    </Link>
                                </li>
                                </ul>

                                {/* DEVELOPERS */}
                                <p className="text-light mb-1">Developers</p>
                                <ul className="d-flex flex-wrap list-unstyled">
                                {gameData?.developers.map((developer: Developers, index: number) => {
                                    return (
                                        <li key={developer.id}>
                                            <Link href={`/search?slug=${developer.slug}`}>
                                                <p className="mb-0 text-white ms-1 me-1">{developer.name}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                                </ul>

                                {/* PUBLISHERS */}
                                <p className="text-light mb-1">Publishers</p>
                                <ul className="d-flex flex-wrap list-unstyled">
                                {gameData?.publishers.map((publishers: Publisher, index: number) => {
                                    return (
                                        <li key={publishers.id}>
                                            <Link href={`/search?slug=${publishers.slug}`}>
                                                <p className="mb-0 text-white ms-1 me-1">{publishers.name}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                                </ul>

                            </div>
                            
                            {/* RATING,GAME DLC, SERIES */}
                            <div className="col-6 col-md-4 col-lg-3">
                                {/* MORE LINKS */}
                                <p className="text-light mb-1">More links</p>
                                <p className="mb-0 text-white ms-1 me-1">{gameData?.reddit_url ? gameData?.reddit_url : ""} </p>
                                <p className=" text-white ms-1 me-1">Based on <span className="text-success fs-5">{gameData?.reddit_count}</span> ratings</p>
                            </div>

                            <div className="col-6 col-md-4 col-lg-3">
                                {/* RATING */}
                                <p className="text-light mb-1">Rating</p>
                                <p className="mb-0 text-white ms-1 me-1">{gameData?.rating} out of {gameData?.rating_top} </p>
                                <p className=" text-white ms-1 me-1">Based on <span className="text-success fs-5">{gameData?.reddit_count}</span> ratings</p>

                                {/* GAME DLC */}
                                <p className="text-light mb-1">Game DLC</p>
                                <ul className="list-unstyled">
                                    {gameAdditions?.results.map((addition: Result, index: number) => {
                                        return (
                                            <li key={index}>
                                                <Link href={`/search?slug=${addition.slug}`}>
                                                    <p className="mb-0 text-white ms-1 me-1">{addition.name}</p>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* GAME SERIES */}
                                <p className="text-light mb-1">Game Series</p>
                                <ul className="list-unstyled">
                                    {gameSeries?.results.map((series: Result, index: number) => {
                                        return (
                                            <li key={index}>
                                                <Link href={`/search?slug=${series.slug}`}>
                                                    <p className="mb-0 text-white ms-1 me-1">{series.name}</p>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <p className="text-light mb-1">Metascore</p>
                                <p className="badge rounded-pill bg-info text-dark">{gameData?.metacritic}</p>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
                <div className={`${gameData ? "d-none" : "d-flex justify-content-center align-items-center p-4"}`}>
                    <HashLoader color="#2127c8"/>
                </div>
            </div>
        </MainContainer>
    )
   }
   export default DetailsPage