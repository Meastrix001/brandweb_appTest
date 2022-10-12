import '../styles/application.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    this is my app
    <Component {...pageProps} />
  </>
}

export default MyApp
