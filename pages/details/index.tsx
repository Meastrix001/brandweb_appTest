import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Game } from '../../types'
import MainContainer from "../components/MainContainer"
import Link from "next/link"
function DetailsPage() {
    const router = useRouter()
    const [gameData, setGameData] = useState<Game>()

    useEffect(() => {
        const fetchData = async () => {
            const results = await fetch(`https://api.rawg.io/api/games/${router.query.slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
            const res = await results.json()
            setGameData(res)
          }
          fetchData()
    }, [router.query.slug])

    return (
        <MainContainer>
            <h2 className="text-white"><Link href="/"><img src="/arrow-left-circle.svg" alt="" /></Link> {gameData?.name}</h2>
        </MainContainer>
            

    )
   }
   export default DetailsPage