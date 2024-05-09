"use client"
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

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
      console.log("logout trying")
      await logoutMutation.mutateAsync();
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{currentUser.data?.user?.email}</AvatarFallback>
                  <span className="sr-only">Toggle user menu</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-black p-5'>
                <DropdownMenuItem className='cursor-pointer' >My Account</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' >Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
    </>
  );
};

export default Profile;
