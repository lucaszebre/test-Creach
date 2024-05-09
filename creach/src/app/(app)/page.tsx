import React, { useContext } from 'react';
import Dashboard from '@/components/Dashboard';
import { redirect } from 'next/navigation';
import { readUserSession } from '@/lib/action';

 

async function Page() {

  const { data } = await readUserSession();

	if (!data.session) {
		return redirect("/auth");
	}



  return (
    <>
     
     <div  className='flex flex-row justify-between w-full'>
      <Dashboard/>
      
    </div>
     
      
    </>
  );
}


export default Page
