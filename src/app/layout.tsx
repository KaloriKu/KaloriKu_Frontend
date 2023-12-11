import type { Metadata } from 'next'
import './globals.css'
import { UserContextProvider } from '@/modules/auth/UserContext'
import { DaftarMakananContextProvider } from '@/modules/makanan/DaftarMakananContext'
import { DaftarMakananDikonsumsiContextProvider } from '@/modules/makanan_dikonsumsi/DaftarMakananDikonsumsiContext'
import Navbar from '@/modules/Navbar'
import { ChakraProvider } from '@chakra-ui/react'
import { inter } from '@/common/Style'
import { TargetContextProvider } from '@/modules/target/TargetContext'

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
        <ChakraProvider>
          <UserContextProvider>
            <DaftarMakananContextProvider>
              <TargetContextProvider>
                <DaftarMakananDikonsumsiContextProvider>
                <Navbar />
              {children}
                </DaftarMakananDikonsumsiContextProvider>
              </TargetContextProvider>
            </DaftarMakananContextProvider>
          </UserContextProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
