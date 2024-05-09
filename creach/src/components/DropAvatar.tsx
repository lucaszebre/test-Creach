'use client'
import { supabase } from '@/utils/supabase/client';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const DropAvatar = (props:{ children:React.ReactNode }) => {


    const logout = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
    
        
        },
        onError: () => {
    
            toast.error("An error occurred during logout");
        },
        onSuccess:()=>{
            toast.success("Logout successful");

        }
      }) 
    

    const handleLogout = () => {
        logout.mutate();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {props.children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropAvatar;
