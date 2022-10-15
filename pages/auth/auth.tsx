import Link from "next/link"
import { useEffect, useState } from "react"
import { initFirebase } from "../../firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Router from "next/router";

function AuthPage() {
    const [toggleType, setToggleType] = useState(false)
    const provider = new GoogleAuthProvider
    const auth = getAuth();

    const signInGoogle = async () => {
      const result = await signInWithPopup(auth, provider)
      if(result){
        Router.push("/")
      }
    }
    useEffect(() => {
      const app = initFirebase
      console.log(app)
    }, []) 
    return (
        <div className="d-flex authPage bg-primary justify-content-center align-items-center mt-5">


        <div className="bg-dark">

            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li onClick={(e) => {setToggleType(false)}} className="cursor-pointer nav-item text-center">
                  <a className={`nav-link text-white ${!toggleType ? "active btl" : ""}`}>Login</a>
                </li>
                <li onClick={(e) => {setToggleType(true)}} className="cursor-pointer nav-item text-center">
                  <a className={`nav-link text-white ${toggleType ? "active btl" : ""}`}>Signup</a>
                </li>
               
              </ul>
              <div className="tab-content" >
                <div className={`tab-pane fade ${!toggleType ? "show active" : ""}`}>
                    <img src="/logo.png" alt="logo" className="p-2" />
                  <div className="form px-4">
                    <label htmlFor="loginName" className="text-white"> Name</label>
                    <input type="text" id="loginName" className="form-control text-white" placeholder="Email or Phone"/>
                    <label htmlFor="loginPass" className="text-white"> Password</label>
                    <input type="text" id="loginPass" className="form-control text-white" placeholder="Password"/>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-light btn-block">
                            <Link href={"/"}>
                                <a className="text-white text-decoration-none">Log in</a>
                            </Link>
                        </button>
                        <button onClick={(e) => {setToggleType(true)}} className="btn btn-light btn-block">Signup</button>
                        <button className="btn btn-light btn-block">
                          <Link href="/">
                            <a className="text-white text-decoration-none">
                            Guest
                            </a>
                          </Link>
                        </button>
                    </div>
                  </div>
                </div>

                <div className={`tab-pane fade ${toggleType ? "show active" : ""}`} >
                <img src="/logo.png" alt="logo" className="p-2" />
                  <div className="form px-4">
                    <label htmlFor="regName" className="text-white"> Name</label>
                    <input type="text" id="regName" name="" className=" text-white form-control" placeholder="First Name..."/>
                    <input type="text" name="" className=" text-white form-control" placeholder="Email"/>
                    <label htmlFor="regPhone" className="text-white">Phone</label>
                    <input type="text" id="regPhone" name="" className=" text-white form-control" placeholder="Phone number..."/>

                    <label htmlFor="regPass" className="text-white">Password</label>
                    <input type="password" id="regPass" className=" text-white form-control" placeholder="Password"/>
                    <input type="password" id="regPassVerf" className=" text-white form-control" placeholder="Reapet password"/>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-light btn-block">Signup</button>
                        <button onClick={(e) => {setToggleType(false)}} className="btn btn-light btn-block">Log in</button>
                        <button className="btn btn-light btn-block">
                          <Link href={"/"}>
                            <a className="text-white text-decoration-none">
                              Guest
                            </a>
                          </Link>
                        </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <button onClick={(e) => {signInGoogle()}} className="m-auto">Log in with google</button>    
                </div>
            </div>
        </div>
      </div>
    )
   }
   export default AuthPage