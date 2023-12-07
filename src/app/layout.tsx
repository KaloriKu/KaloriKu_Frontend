import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserContextProvider } from '@/modules/auth/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KaloriKu',
  description: '7 Wonders App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>KaloriKu</title>
      </head>
      <body className={inter.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}
