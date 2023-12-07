import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import NavBar from './Components/NavBar/page'
import Footer from './Components/Footer/Footer'
// import { makeStore } from './lib/store'
import { headers } from "next/headers";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Locations',
  description: 'Client for locations',
}

export default function RootLayout({ children }) {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  const [,pathname] = fullUrl.match( new RegExp(`https?:\/\/${domain}(.*)`))||[];

console.log(pathname);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <header><NavBar /></header>
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
