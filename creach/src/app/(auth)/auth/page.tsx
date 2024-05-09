import React from 'react';
import Auth from '@/components/Auth';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

 function Home() {
    // const supabase = createClient();



    // const { isLoading, data: session } =useQuery({
    //   queryFn: async () => {
        
    //       const { data: { session } } = await supabase.auth.getSession();
    //       return session;
    //   },
      
    //   queryKey: [`session`]
      
    //   })

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    

    return (
        <>
            <Auth />
        </>
    );
}


export default Home