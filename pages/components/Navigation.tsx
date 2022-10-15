import { useState, useEffect } from "react";
import { Game } from '../../types'
import Link from 'next/link'
import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";
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
    const [searchOpen, setSearchOpen] = useState(false)
    const auth = getAuth();
    useEffect(() => {
        console.log(auth)
    
        setSearchResult([])
        if(searchQuerry){
    
          const timer = setTimeout(() => {
            const fetchData = async () => {
              const results = await fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuerry}`)
              const searchData = await results.json()
              console.log(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuerry}`)
              setSearchResult(searchData.results)
            }
            fetchData()
          }, 500)      
          return () => clearTimeout(timer)
        }
      }, [searchQuerry, updateSearch])
      const activitiesPaths =[
        {
          title: "Games",
          path: "/",
          desc: "",
          id: 1
        },
        {
          title: "Tournaments",
          path: "/",
          desc: "",
          id: 2
        },
        {
          title: "Teams",
          path: "/",
          desc: "",
          id: 3
        },
      ];
      const otherPaths =[
        {
          title: "News",
          path: "/",
          desc: "",
          id: 1
        },
        {
          title: "Partners",
          path: "/",
          desc: "",
          id: 2
        },
        {
          title: "About",
          path: "/",
          desc: "",
          id: 3
        },
        {
          title: "Help",
          path: "/",
          desc: "",
          id: 4
        },
      ];
  return ( <>
        {/* top navigation */}
        <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-primary fixed-top"
        >
        <div className="container-fluid d-flex justify-content-between">
        <div className="d-none d-lg-block hide"></div>
          <div className='d-flex justify-content-between'>
            {/* SEARCH */}
            <form className=" d-md-flex input-group navSearchField  border-box ml-2">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded-left text-white border-light"
              placeholder='Search library'
              onChange={(e) => {
                setSearchQuerry(e.target.value),
                setSearchOpen(true); 
              }}
              onClick={(e)=> {setUpdateSearch(+1),
                setSearchOpen(true)}}
              />
              <i className='p-2 d-flex align-items-center border cursor-pointer border-light border rounded-right' onClick={(e)=> {childToParentSearchRes(searchResult), setSearchOpen(false)}}>
                <img src="/search.svg" height="25px"  alt="" />
              </i>
              
              {/* SEARCH RESULT */}
              <ul className={`searchResultsList rounded d-flex flex-column bg-dark ${searchOpen ? "" : "d-none"}`}>
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
              <rect onClick={(e) => {setSearchOpen(false)}} className={`${searchOpen === false ? "d-none" : ""} test`}>
              </rect>
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
              <p className='m-0 text-end text-white'>{auth ? auth.currentUser?.displayName : "Guest"} </p>
              <p className='m-0 text-right'><small className='text-gray'> {auth.currentUser ? auth.currentUser.email : ""} </small></p>
            </div>
            <img
              onClick={(e) => {setDropdownToggle(!dropdownToggle)}}
              src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : "/placeholder_user.png"}
              className="rounded-circle"
              height="44"
              alt=""
              loading="lazy"
              />
              <button onClick={(e) => {setDropdownToggle(!dropdownToggle)}} className={`shadow-none text-white btn btn-secondary dropdown-toggle dropdownButton $dDropdownToggle ? "rotate" : ""}`}type="button"data-bs-toggle="dropdown" aria-expanded="false"/>
              <ul className={`mt-5 bg-dark dropdown-menu ${dropdownToggle ? "show" : ""}`}>
                <li>
                  <Link href="/profile">
                    <a className={`${!auth.currentUser ? "d-none" : ""} text-white dropdown-item`}>Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/auth">
                    <a className={`${auth.currentUser ? "d-none" : ""} text-white dropdown-item`}>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <a onClick={(e) =>{auth.signOut()}} className={`${!auth.currentUser ? "d-none" : ""} text-white dropdown-item`}>Log out</a>
                  </Link>
                </li>
              </ul>
            </div>
        </div>     
        </nav>
                
        {/* side navigation */}
        <nav id="sidebarMenu" className={`d-lg-block sidebar collapse ${sidebarToggle ? "show" : ""}`}>
        <div className="position-sticky">
          <div className="list-group list-group-flush mt-lg-4 mg-auto container">
            <div className='d-flex pb-4 ps-1 justify-content-between'>
              <Link href={"/"}>
                <a className="navbar-brand ml-0 m-lg-auto">
                  <img
                  src="/logo.png"
                  alt=""
                  loading="lazy"
                  />
                </a> 
              </Link>
              <button
              className={`navbar-toggler p-2 ${sidebarToggle ? "" : "d-none"}`}
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
            <div className=' flex justify-center align-content-center is-fullheight p'>
              <h3 className='text-white fit-content bg-light rounded ps-4 pe-5 pt-2 pb-2'>Activities</h3>
              <ul className='list-unstyled ps-4 mb-5'>
                {activitiesPaths.map((path) => {
                  return (
                    <li key={path.id}>
                      <Link href={path.path}>
                        <a href={path.path} className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple" aria-current="true">
                          <span>{path.title}</span>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <h3 className='text-white fit-content bg-light rounded ps-4 pe-5 pt-2 pb-2'>Other</h3>
              <ul className='list-unstyled ps-4 mb-5'>
                {otherPaths.map((path) => {
                  return (
                    <li key={path.id}>
                      <Link href={path.path}>
                        <a href={path.path} className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple" aria-current="true">
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
                  className="rounded-circle ps-4"
                  height="44"
                  alt=""
                  loading="lazy"
                  />
                <ul className=" bg-dark list-unstyled ps-4">
                  <li className=''>
                    <Link href="/profile">
                      <a className="list-group-item bg-transparent text-white list-group-item-action py-2 ripple" href="#">
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li className=''>
                    <Link href={""}>
                      <a onClick={(e) =>{auth.signOut()}} className={`${!auth ? "d-none" : ""} list-group-item bg-transparent text-white list-group-item-action py-2 ripple`} href="/logout">
                        Log out
                      </a>
                    </Link>
                  </li>
                  <li className=''>
                    <Link href="/auth/auth">
                      <a className={`${auth ? "d-none" : ""} list-group-item bg-transparent text-white list-group-item-action py-2 ripple`} href="/logout">
                        Log in
                      </a>
                    </Link>
                  </li>                    
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}