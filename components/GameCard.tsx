import { useState, useEffect } from "react";
import { Game } from '../types'
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
                console.log("response", response)
                return setGameData(response)
            }
            fetchGameData()
        }
      }, [])

  return (
        <div className="gameCard pb-4 m-auto mt-0 col-6 col-xs-2 col-md-3 col-lg-3">
            <a href="" className="text-decoration-none">
                <figure className="px-2 border-box position-relative">
                    <img src={gameData?.background_image} width="100%"
                    height="180px" alt="" className="rounded-3" />
                    <div className="circleShadow position-absolute"></div>
                </figure>
                <div className="bg-light p-2 rounded-3 pt-4">
                    <h3 className="text-white">{gameData?.name}</h3>
                    <p className="text-black">studio</p>

                    <div className="">
                        <ul className="d-flex list-unstyled">
                            <li className="text-white p-2">Ps4</li>
                            <li className="text-white p-2">Pc</li>
                            <li className="text-white p-2">Xbox</li>
                            <li className="text-white p-2">NN</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
  );
}