import { readUserSession } from '@/lib/action';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

  const { data } = await readUserSession();

	if (!data.session) {
		return redirect("/auth");
	}
  
  return (
    <div>
      
    </div>
  )
}

export default page
