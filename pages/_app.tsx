import '../styles/application.scss'
import '../styles/gameCard.scss'
import type { AppProps } from 'next/app'
import Navigation from './components/Navigation'
import { useState } from 'react'
function MyApp({ Component, pageProps }: AppProps) {


  const [searchDataRes, setSearchDataRes] = useState([]);

    const childToParentSearchRes = (data: any) => {
      setSearchDataRes(data)
    }


  return <>
  <Navigation 
  childToParentSearchRes={childToParentSearchRes} 
  />
    <Component searchDataRes={searchDataRes} {...pageProps} />
  </>
}

export default MyApp
