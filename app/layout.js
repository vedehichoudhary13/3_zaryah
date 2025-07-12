import { Inter, Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import { LocationProvider } from './contexts/LocationContext'
import { CartProvider } from './contexts/CartContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: 'Zaryah - Your Path to Meaningful Gifts',
  description: 'Discover unique handmade gifts from passionate artisans. Every purchase tells a story and supports creative dreams.',
  keywords: 'handmade gifts, artisan crafts, unique gifts, personalized gifts, gift marketplace',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <LocationProvider>
            <AppProvider>
              <CartProvider>
                <NotificationProvider>
                  {children}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#f9fafb',
                        color: '#374151',
                        border: '1px solid #bae6fd',
                      },
                      success: {
                        style: {
                          background: '#d1fae5',
                          color: '#065f46',
                          border: '1px solid #6ee7b7',
                        },
                      },
                      error: {
                        style: {
                          background: '#fee2e2',
                          color: '#be123c',
                          border: '1px solid #fda4af',
                        },
                      },
                    }}
                  />
                </NotificationProvider>
              </CartProvider>
            </AppProvider>
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}