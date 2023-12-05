import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
// import { makeStore } from './lib/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Locations',
  description: 'Client for locations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
