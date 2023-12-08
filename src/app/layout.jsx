import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Locations',
  description: 'Client for locations',
}


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}
