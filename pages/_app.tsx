import '../styles/application.scss';
import '../styles/gameCard.scss';
import type { AppProps } from 'next/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import Navigation from './components/Navigation';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { initFirebase } from '../firebase/firebaseapp';
function MyApp({ Component, pageProps }: AppProps) {
  initFirebase()

  const Router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [searchDataRes, setSearchDataRes] = useState([]);

  const childToParentSearchRes = (data: any) => {
    setSearchDataRes(data);
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
