import Link from "next/link";
import { useState, useEffect } from "react";
import { Game } from '../../types'
import Cliploader from "react-spinners/Cliploader";


export default function GameCard(data: any) {
    const [gameData, setGameData] = useState<Game>()

    useEffect(() => {
        if(data.data.id){
            
            const fetchGameData = async () => {
                const results = await fetch(`https://api.rawg.io/api/games/${data.data.id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
                const response = await results.json()
                return setGameData(response)
            }
            fetchGameData()
        }
      }, [])

  return (
        <div className="card bg-transparent border-0 gameCard mb-0 pb-4 pt-4 m-auto mt-0 col-6 col-md-5 col-lg-4 col-xl-3">
            <Link href={`/details?slug=${gameData?.slug}`}>
                <a href="" className="text-decoration-none">
                    <figure className={`${gameData ? "" : "placeholder-wave"} px-1 border-box position-relative`}>
                        <img src={gameData?.background_image ? gameData?.background_image : "/placeholder.png"} width="100%"
                        height="100px" alt="" className="rounded-3" />
                        <div className="circleShadow position-absolute"></div>
                    </figure>
                    <div className="bg-light p-2 pb-3 rounded-3 pt-5">

                        {gameData ? 
                        <h5 className="text-white"><small>{gameData.name}</small></h5>
                        : 
                        <div className="pt-4 pb-4 m-auto d-flex justify-content-center align-items-center">
                            <Cliploader color="#2127c8"/>
                        </div>
                        }
                        {/* <p className="text-black">studio</p> */}
                        <p className="text-white mb-0 d-flex justify-content-between"><small>{gameData?.released}</small><small>{gameData?.metacritic}/100</small></p>
                        <div className="hr-divider rounded"/>
                        <div className="">
                            <ul className="d-flex list-unstyled mb-0">
                                <li className="text-white p-2">x</li>
                                <li className="text-white p-2">x</li>
                                <li className="text-white p-2">x</li>
                                <li className="text-white p-2">x</li>
                            </ul>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
  );
}