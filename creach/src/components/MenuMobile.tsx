"use client"
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Link from 'next/link'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const MenuMobile = () => {

    const currentUser =useQuery({
        queryFn: async () => {
          const supabase = createClient()
          const { data} = await supabase.auth.getUser()
    
          return data
        },
        queryKey: ['user'],
        enabled:true
      })

      const router = useRouter();
    const logoutMutation = useMutation({
        mutationFn: async () => {
            const supabase = createClient()
            const { error } = await supabase.auth.signOut();
           
        },
        onError: () => {
            toast.error(`Error logging out`);

        },
        
        onSuccess:()=>{
            toast.success('Logged out successfully');

        }
        
        
    })

    
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
  

<Drawer >
<DrawerTrigger className='md:hidden flex'>
    <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</DrawerTrigger>
<DrawerContent className='flex flex-col items-center gap-5 p-10 justify-between'>
        <Link className="hover:underline text-center font-bold" href="/">
            Quizzes
        </Link>
        <Link href={'/history'} className="hover:underline text-center font-bold text-black" >
            History
        </Link>
    
        <Link href={'/edit'} className="hover:underline text-center font-bold text-black" >
            Edit
        </Link>

        {currentUser.data?.user ? <Button className='font-bolf text-black' variant={'outline'} onClick={handleLogout}>Logout</Button> : <Link className='text-center font-bold text-black hover:underline' href='/auth'>LOGIN</Link>}

               
              

  <DrawerFooter>
    <DrawerClose>
      <Button variant="outline">Close</Button>
    </DrawerClose>
  </DrawerFooter>
</DrawerContent>
</Drawer>

  )
}


export default MenuMobile
