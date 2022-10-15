import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Game, GameData } from '../types'
import GameCard from './components/GameCard'
import MainContainer from './components/MainContainer'

function Search() {
const router = useRouter()
const [searchResult, setSearchResult] = useState<GameData>()
const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        const fetchData = async () => {
            if(router.query.tag) {
              setSearchResult(undefined)
                const results = await fetch(`https://api.rawg.io/api/games?tags=${router.query.tag}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${pageNumber}`)
                const res = await results.json()
                if(res){
                    console.log(res)
                    setSearchResult(res)
                }
            }

            if(router.query.genre) {
                setSearchResult(undefined)
                const results = await fetch(`https://api.rawg.io/api/games?genres=${router.query.genre}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${pageNumber}`)
                const res = await results.json()
                console.log(`https://api.rawg.io/api/games?genres=${router.query.genre}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
                if(res){
                    console.log(res)
                    setSearchResult(res)
                }
            } else {
                if(router.query.tag === undefined && router.query.genre === undefined || searchResult && searchResult === undefined){
                    router.push("/")
                  }
            }

          }

          fetchData()
    }, [router.query.slug, router.query.genre, pageNumber])
    return (
      <MainContainer>

        <div className={`container p-4 ${searchResult ? "" : "d-none"}`} >
          <h2 className=' d-flex flex-column text-white mb-5 pt-md-5'>{router.query.tag ? router.query.tag : router.query.genre} games</h2>
              
          <div className="row list is-justify-content-items-flex-start" data-masonry='{"percentPosition": true}'>
            {searchResult?.results.map((obj: any) => {
              return ( 
                <GameCard key="" data={obj}/> )
              })}
          </div>
      
          <h3 className='text-white pt-md-5 d-flex justify-content-between'>
            <small className={`cursor-pointer ${searchResult?.previous === null ? "d-none" : ""}`} onClick={(e) => {setPageNumber(pageNumber -1)}}>Prev page</small>
            <small className={`cursor-pointer ${searchResult?.next === null? "d-none" : ""}`} onClick={(e) => {setPageNumber(pageNumber +1)}}>Next page</small>
          </h3>
        </div>
      </MainContainer>
    )
  }
export default Search