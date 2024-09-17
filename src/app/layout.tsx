import './globals.css'
import { Providers } from '../components/Providers'
import Sidebar from '../components/Sidebar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}