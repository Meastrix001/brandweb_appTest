import { useState, useEffect } from "react";
import { Game } from '../../types'
import Link from 'next/link'

type Props = {
  childToParentSearchRes: any,
};

export default function Navigation( {childToParentSearchRes}: Props, {RawgData}: any) {
    const [gameData, setGameData] = useState<Game>()
    const [dropdownToggle, setDropdownToggle] = useState<boolean>(false)
    const [sidebarToggle, setSidebarToggle] = useState<boolean>(false)
    const [searchQuerry, setSearchQuerry] = useState<String>("")
    const [updateSearch, setUpdateSearch] = useState<Number>(0)
    const [searchResult, setSearchResult] = useState<any[]>([])
    const [searchOpen, setSearchOpen] = useState(true)

    useEffect(() => {
        console.table(RawgData)
    
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
          path: "/",
          desc: "",
          id: 1
        },
        {
          title: "All Games",
          path: "/",
          desc: "",
          id: 2
        },
      ];

  return ( <>
        {/* top navigation */}
        <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-primary fixed-top"
        >
        <div className="container-fluid d-flex justify-content-between">
          <div className='d-flex justify-content-between'>
            <form className=" d-md-flex input-group navSearchField w-auto border-box ml-2">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded-left text-white border-light"
              placeholder='Search library'
              onChange={(e) => {
                setSearchQuerry(e.target.value); 
              }}
              onClick={(e)=> {setUpdateSearch(+1),
                setSearchOpen(true)}}
              />
              <i className='p-2 border border-light border rounded-right' onClick={(e)=> {childToParentSearchRes(searchResult), setSearchOpen(false)}}>
                <img src="/search.svg" height="25px"  alt="" />
              </i>

              <ul className={`searchResultsList rounded is-flex bg-dark ${searchOpen ? "" : "d-none"}`}>
                { searchResult?.slice(0,10).map((e) => {
                  return <li className='list-unstyled pl-2 pr-2' key={e.id}>
                    <Link href={`/details?slug=${e.slug}`}>
                      <a  onClick={(e) => {setSearchOpen(false)}} href="" className='d-flex align-items-center text-white text-decoration-none mt-2 mb-2'>
                        <img width="120px" src={e.background_image}/>
                        <div>
                        <p className='px-4'>{e.name}</p> 
                        <p className='px-4 d-none d-md-block'>{e.released}</p> 
                        <ul>    
                        </ul> 
                        </div>
                      </a>
                    </Link>
                  </li>
                })}
              </ul>
            </form>

            <button
            className={`navbar-toggler ${sidebarToggle ? "d-none" : ""}`}
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={(e) => {setSidebarToggle(true)}}
            >
            <img src="/apps-alt.svg" alt="" />
            </button>   

          </div>
          <div className="dropdown d-none d-lg-flex">
            <div className='me-1'>
              <p className='m-0 text-end text-white'>Meastrix001</p>
              <p className='m-0 text-right'><small className='text-gray'> Nick Roofthooft</small></p>
            </div>
            <img
              onClick={(e) => {setDropdownToggle(!dropdownToggle)}}
              src="/bear_cartoon.png"
              className="rounded-circle"
              height="44"
              alt=""
              loading="lazy"
              />
              <button onClick={(e) => {setDropdownToggle(!dropdownToggle)}} className={`shadow-none text-white btn btn-secondary dropdown-toggle dropdownButton $dDropdownToggle ? "rotate" : ""}`}type="button"data-bs-toggle="dropdown" aria-expanded="false"/>
              <ul className={`mt-5 bg-dark dropdown-menu ${dropdownToggle ? "show" : ""}`}>
                <li><a className="text-white dropdown-item" href="#">Profile</a></li>
                <li><a className="text-white dropdown-item" href="#">Log out</a></li>
                <li><a className="text-white dropdown-item" href="#">Log in</a></li>
              </ul>
            </div>
        </div>     
        </nav>
                
        {/* side navigation */}
        <nav id="sidebarMenu" className={`d-lg-block sidebar collapse ${sidebarToggle ? "show" : ""}`}>
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-lg-3 ps-4 pe-4 mt-lg-4 mg-auto container">
            <div className='d-flex justify-content-between'>
              <a className="navbar-brand ml-0 m-lg-auto" href="#">
              <img
                src="https://theubj.com/wp-content/uploads/2021/05/CuriosityStreamBlack.svg.png"
                width="250px"
                alt=""
                loading="lazy"
                />
              </a> 
              <button
              className={`navbar-toggler ${sidebarToggle ? "" : "d-none"}`}
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={(e) => {setSidebarToggle(false)}}
              >
                <img src="/cancel.svg" alt="" />
              </button> 
            </div>
            <div className=' flex justify-center align-content-center is-fullheight'>
              <h3 className='text-white bg-danger'>Dashboard</h3>
              <ul className='list-unstyled mb-5'>
                {paths.map((path) => {
                  return (
                    <li key={path.id}>
                      <Link href={path.path}>
                        <a href="#" className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple" aria-current="true">
                          <span>{path.title}</span>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
                <div className='d-lg-none'>
                  <img
                  onClick={(e) => {setDropdownToggle(!dropdownToggle)}}
                  src="/bear_cartoon.png"
                  className="rounded-circle"
                  height="44"
                  alt=""
                  loading="lazy"
                  />
                <ul className=" bg-dark list-unstyled">
                  <li className=''><a className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple" href="#">Profile</a></li>
                  <li className=''><a className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple" href="#">Log Out</a></li>
                </ul>
                </div>
            </div>
          </div>
        </div>
        </nav>

    </>
  );
}