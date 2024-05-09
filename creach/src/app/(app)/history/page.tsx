/* eslint-disable react/jsx-no-undef */
import { History } from '@/components/History'
import { readUserSession } from '@/lib/action';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

  const { data } = await readUserSession();

	if (!data.session) {
		return redirect("/auth");
	}
  
  return (
    
      <History />
    
  )
}

export default page
