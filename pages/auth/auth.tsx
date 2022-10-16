import Link from "next/link"
import { useEffect, useState } from "react"
import { initFirebase } from "../../firebase/firebaseapp"
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { User } from "../../types";


function AuthPage() {
  
  const googleProvider = new GoogleAuthProvider
  const facebookProvider = new FacebookAuthProvider
  const twitterProvider = new TwitterAuthProvider
  const githubProvider = new GithubAuthProvider
  const auth = getAuth();
  const [toggleType, setToggleType] = useState(false)
  const [userRegCreds, setUserRegCreds] = useState({
    email: "",
    displayName: "",
    password: "",
    password_verify: "",
      photoURL: ""
    })
    const [userCreds, setUserCreds] = useState({
      email: "",
      password: "",
    })

    const onRegChange = (e:any) => {
      setUserRegCreds({ ...userRegCreds, [e.target.name]: e.target.value });
      console.log(userRegCreds, e.target.value)
    }

    const onChange = (e:any) => {
      setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
      console.log(userCreds, e.target.value)
    }
    
    const loginProvider = async (provider: string) => {
      if(provider === "google") {
        const result = await signInWithPopup(auth, googleProvider)
        if(result){
          Router.push("/")
        }
      }
      
      if(provider === "facebook") {
        const result = await signInWithPopup(auth, facebookProvider)
        if(result){
          Router.push("/")
        }
      }

      if(provider === "github") {
        const result = await signInWithPopup(auth, githubProvider)
        if(result){
          Router.push("/")
        }
      }

      if(provider === "twitter") {
        const result = await signInWithPopup(auth, twitterProvider)
        if(result){
          Router.push("/")
        }
      }
    }


    const signInWithCreds = async () => {
      console.log("user created")
      const auth = getAuth();
      if(userRegCreds.password === userRegCreds.password_verify && userRegCreds.email && userRegCreds.password)
        createUserWithEmailAndPassword(auth, userRegCreds.email, userRegCreds.password)
          .then((userCredential) => {
            console.log(userCredential)
            if(auth.currentUser){
              updateProfile(auth.currentUser, {
                photoURL: userRegCreds.photoURL,
                displayName: userRegCreds.displayName
              }).then((response) => {
              console.log("RESPONSE", auth.currentUser)
              Router.push("/")
              }).catch((error) => {
                // An error occurred
                // ...
              });
            }

          })
          .catch((error) => {
          });
    }
    const logInWithCreds = async () => {
      if(userCreds.password && userCreds.email){
        signInWithEmailAndPassword(auth, userCreds.email, userCreds.password)
          .then((userCredential) => {
            Router.push("/")
            console.log(userCredential)
          })
          .catch((error) => {
            console.log(error)
            const errorMessage = error.message;
          });
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
              <div className="tab-content d-md-flex" >
                <div className={`tab-pane fade ${!toggleType ? "show active" : ""}`}>
                    <img src="/logo.png" alt="logo" className="p-2" />
                  <div className="form px-4 fit-height">
                    <label htmlFor="loginName" className="text-white"> Name</label>
                    <input onChange={(e) => {onChange(e)}} type="text" id="loginName" className="form-control text-white" name="email" placeholder="Email or Phone" value={userCreds.email}/>
                    <label htmlFor="loginPass" className="text-white"> Password</label>
                    <input onChange={(e) => {onChange(e)}} type="text" id="loginPass" className="form-control text-white" name="password" placeholder="Password" value={userCreds.password}/>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-light btn-block">
                            <Link href={""}>
                                <a onClick={(e) => {logInWithCreds()}} className="text-white text-decoration-none">Log in</a>
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
                  <div className="form px-4 fit-height"> 
                  {/* {JSON.stringify(userRegCreds)} */}
                    <label htmlFor="regName" className="text-white"> Display name</label>
                    <input onChange={(e) => {onRegChange(e)}} type="text" id="regName" name="displayName" className=" text-white form-control" placeholder="First Name..." value={userRegCreds.displayName}/>
                    <div>
                      <label htmlFor="regName" className="text-white">Email</label>
                      <input onChange={(e) => {onRegChange(e)}} type="text" name="email" className=" mb-0 text-white form-control" placeholder="Email" value={userRegCreds.email}/>
                      <div className={`badge ${ userRegCreds.email.includes("@") ? "d-none" : " bg-danger"} mb-3`}>Invalid email</div>
                    </div>

                    <label htmlFor="regPhoto" className="text-white">Picture</label>
                    <input onChange={(e) => {onRegChange(e)}} type="text" id="regPhoto" name="photoURL" className=" text-white form-control" placeholder="Profile picture" value={userRegCreds.photoURL}/>

                    <div>
                      <label htmlFor="regPass" className="text-white">Password</label>
                      <input onChange={(e) => {onRegChange(e)}} type="password" id="regPass" name="password" className=" text-white form-control" placeholder="Password" value={userRegCreds.password}/>
                      <input onChange={(e) => {onRegChange(e)}} type="password" id="regPassVerf" name="password_verify" className="mb-0 text-white form-control" placeholder="Reapet password" value={userRegCreds.password_verify}/>
                      <div className={`badge ${userRegCreds.password === userRegCreds.password_verify ? "d-none" : " bg-danger"}`}> passwords dont match</div>
                      <div className={`badge ${userRegCreds.password.length >= 6 ? "d-none" : " bg-danger"}`}> passwords must be 6 chars</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button onClick={(e) => {signInWithCreds()}} className="btn btn-light btn-block">Signup</button>
                        <button onClick={(e) => {setToggleType(false)}} className="btn p-2 btn-light btn-block">Log in</button>
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
                <div className="d-flex pt-4 pt-md-0 flex-column align-items-center justify-content-center">
                  <button onClick={(e) => {loginProvider("google")}} className="full-width p-2">Log in with google</button>    
                  <button onClick={(e) => {loginProvider("facebook")}} className="full-width p-2">Log in with Facebook</button>    
                  <button onClick={(e) => {loginProvider("github")}} className="full-width p-2">Log in with Github</button>    
                  <button onClick={(e) => {loginProvider("twitter")}} className="full-width p-2">Log in with Twitter</button>    
                </div>
            </div>
        </div>
      </div>
    )
   }
   export default AuthPage