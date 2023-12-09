import { Inter, Comfortaa } from 'next/font/google'

export enum Color {
    ONE='#ff9747'
}
export const inter = Inter({ subsets: ['latin'] })
export const comfortaa = Comfortaa({ subsets: ['latin'], weight: ['300', '400', '500', '700']})