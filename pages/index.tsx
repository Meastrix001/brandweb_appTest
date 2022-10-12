import type { GetStaticProps, NextPage, } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { json } from 'stream/consumers'
import GameCard from '../components/GameCard'
const Home: NextPage = ({RawgData}: any) => {
  console.log(RawgData)
  // const [searchResult, setSearchResult] = useState()
  const [searchResult, setSearchResult] = useState<any[]>([])
  const [updateSearch, setUpdateSearch] = useState<Number>(0)
  const [searchQuerry, setSearchQuerry] = useState<String>("")
  
  useEffect(() => {
    setSearchResult([])
    if(searchQuerry){

      const timer = setTimeout(() => {
        const fetchData = async () => {
          const results = await fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuerry}`)
          const searchData = await results.json()
          setSearchResult(searchData.results)
        }
        fetchData()
      }, 500)      
      return () => clearTimeout(timer)
    }
  }, [searchQuerry, updateSearch])


  const paths =[
    {
      title: "Home",
      desc: "",
      id: 1
    },
    {
      title: "All Games",
      desc: "",
      id: 2
    },
  ];

  return (
    <div>
      <Head>
        <title>brandWeb Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      {/* top navigation */}
      <nav
        id="main-navbar"
        className="container navbar navbar-expand-lg navbar-light bg-primary fixed-top"
        >
        <div className="container-fluid">
          <div className='d-flex'>
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i className="fas fa-bars text-danger">X</i>
            </button>  
            <form className=" d-md-flex input-group navSearchField w-auto border-box ml-2">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded-left text-white border-light"
              placeholder='Search library'
              onChange={(e) => {
                setSearchQuerry(e.target.value); 
              }}
              onClick={(e)=> {setUpdateSearch(+1)}}
              />
              <i className='p-2 border border-light border rounded-right' onClick={(e)=> {setSearchQuerry(searchQuerry)}}>
                <img src="/search.svg" height="25px"  alt="" />
              </i>
              <ul className='searchResultsList rounded is-flex bg-dark'>
                { searchResult?.slice(0,10).map((e) => {
                  return <li className='list-unstyled pl-2 pr-2' key={e.id}>
                    <a href="" className='d-flex align-items-center text-white text-decoration-none mt-2 mb-2'>
                      <img width="120px" src={e.background_image}/>
                      <div>
                      <p className='px-4'>{e.name}</p> 
                      <p className='px-4'>{e.released}</p> 
                      <ul>    
                      </ul> 
                      </div>
                      </a>
                  </li>
                })}
              </ul>
            </form>
          </div>

          
          <ul className="navbar-nav d-flex flex-row m-auto m-sm-0">   
  
            <li className="nav-item open dropdown">
              <a
                 className="nav-link open text-white dropdown-toggle hidden-arrow d-flex align-items-center"
                 href="#"
                 id="navbarDropdownMenuLink"
                 role="button"
                 data-mdb-toggle="dropdown"
                 aria-expanded="false"
                 >
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                  className="rounded-circle"
                  height="44"
                  alt=""
                  loading="lazy"
                  />
              </a>
              <ul
                  className="dropdown-menu open dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                  >
                <li><a className="dropdown-item" href="#">My profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>      
      </nav>
      

      {/* side navigation */}
      <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
      <a className="navbar-brand m-auto" href="#">
            <img
                 src="https://theubj.com/wp-content/uploads/2021/05/CuriosityStreamBlack.svg.png"
                 width="250px"
                 alt=""
                 loading="lazy"
                 />
          </a> 
            <div className=' flex justify-center align-content-center is-fullheight'>
              <h3 className='text-white bg-danger'>Dashboard</h3>
              {paths.map((path) => {
                return (
                <a key={path.id} href="#" className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple"    aria-current="true">
                    <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>{path.title}</span>
                  </a>
                )
              })}

            </div>
          </div>
        </div>
      </nav>

      <main className='bg-primary border-4 border-dark' onClick={(e) => {setSearchResult([])}}>
        <div className='p-4'>
          {/* title */}
          <div className=' container mb-5 pb-5 pt-5'>
            <h2 className='text-white'>TOP GAMES</h2>
          </div>
          
          {/* gameslist */}
        <div className="container">
          <div className="row is-justify-content-items-flex-start">
              {RawgData.slice(0, 4).map((obj: any) => {
                return ( 
                  <GameCard key="" data={obj}/> )
              })}
          </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) =>{

  const [RawgDataRes] = await Promise.all([
    // RawgData
    fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`),
]);


const [RawgData] = await Promise.all([
  RawgDataRes.json()
]);
return { props: { RawgData: RawgData.results } };
}

export default Home