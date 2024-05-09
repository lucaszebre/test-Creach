
import '../globals.css'
import React from 'react'

import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import ReactQueryProvider from '@/providers/ReactProvidersQuery';
import DropAvatar from '@/components/DropAvatar';
import { createClient } from '@/utils/supabase/server';
import Logout from '@/components/Profile';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Profile from '@/components/Profile';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  const supabase = createClient();

  const user = await supabase.auth.getUser()

 


  return (
  <html lang="en">
    <body >
    <ReactQueryProvider>
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">QuizzOnDemand</h1>
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li>
                <Link className="hover:underline" href="/">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link href={'/history'} className="hover:underline" >
                  History
                </Link>
              </li>
              <li>
                <Link href={'/edit'} className="hover:underline" >
                  Edit
                </Link>
              </li>
              <li>  
               {user ? <Profile /> : <Link href='/auth'>LOGIN</Link>}

               
              </li>
              
            </ul>
            
          </nav>
        </div>
      </header>
      <main>
        <div className='flex bg-background flex-row h-screen justify-center md:justify-between w-full'>
    
          {children}
        </div>
    </main>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
<footer className="bg-gray-900 text-white py-4 px-6">
        <div className="text-center">QuizzOnDemand by lucaszebre</div>
      </footer>
    </div>
    </ReactQueryProvider>

    </body>

  </html>
  )
}


