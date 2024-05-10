/* eslint-disable react/jsx-no-undef */
"use client"
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';


const Profile = () => {

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

    const currentUser =useQuery({
      queryFn: async () => {
        const supabase = createClient()
        const { data} = await supabase.auth.getUser()
  
        return data
      },
      queryKey: ['user'],
      enabled:true
    })

  

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if(currentUser.isLoading){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <>
      <DropdownMenu >
              <DropdownMenuTrigger asChild>
                  <span className='cursor-pointer'>{currentUser.data?.user?.email}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-900 text-white' >
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer md:text-white text-black' onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
    </>
  );
};

export default Profile;
