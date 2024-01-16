import '@/styles/globals.css'
import { Layout } from '../../Components'
import { StateContext } from '../../Context/StateContext'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return(
    <StateContext>
        <Layout>
          <Toaster/>
          <Component {...pageProps} />
        </Layout>
    </StateContext>
  )
}
