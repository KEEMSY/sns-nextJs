import './globals.css'
import { Providers } from '../components/Providers'
import Sidebar from '../components/Sidebar'
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <Providers>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 flex justify-center p-4 overflow-hidden">
                <div className="w-full max-w-2xl bg-[#1a1a1a] rounded-xl overflow-hidden flex flex-col rounded-t-[2rem]">
                  {children}
                </div>
              </main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}