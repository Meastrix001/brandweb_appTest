import '../styles/application.scss'
import '../styles/gameCard.scss'
import type { AppProps } from 'next/app'
import Navigation from './components/Navigation'
import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import { initFirebase } from '../firebase/firebaseapp'
import { getAuth } from 'firebase/auth'
function MyApp({ Component, pageProps }: AppProps) {
  initFirebase()

  const Router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const [searchDataRes, setSearchDataRes] = useState([]);

  console.log("router", Router)
    const childToParentSearchRes = (data: any) => {
      setSearchDataRes(data)
    }

  return <>
  {!Router.route.includes("/auth") ? 
  <Navigation 
  childToParentSearchRes={childToParentSearchRes} 
  />
  : ""
  }
    <Component searchDataRes={searchDataRes} {...pageProps} />
  </>
}

export default MyApp
