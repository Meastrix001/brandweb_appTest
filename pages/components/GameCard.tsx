import Link from "next/link";
import { useState, useEffect } from "react";
import { Game } from '../../types'
// type Props = {
//     savePost: (e: React.FormEvent, formData: Game) => void
//   }

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
        <div className="gameCard mb-0 pb-4 pt-4 m-auto mt-0 col-6 col-md-5 col-lg-4 col-xl-3">
            <Link href={`/details?slug=${gameData?.slug}`}>
                <a href="" className="text-decoration-none">
                    <figure className="px-2 border-box position-relative">
                        <img src={gameData?.background_image} width="100%"
                        height="80px" alt="" className="rounded-3" />
                        <div className="circleShadow position-absolute"></div>
                    </figure>
                    <div className="bg-light p-2 rounded-3 pt-4">
                        <h3 className="text-white"><small>{gameData?.name}</small></h3>
                        <p className="text-black">studio</p>
                        <p className="text-white mb-0"><small>{gameData?.released}</small></p>

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