
import React from 'react';
import { Login } from './Login'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Register from './Register';

function Auth() {

  return (
    
   

    <div className=" relative mt-5 mb-5 w-full h-screen flex col content-center items-center justify-center ">
    
        <Tabs defaultValue="register" className="max-w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login /></TabsContent>
        <TabsContent value="register"><Register /></TabsContent>
      </Tabs>
          
        </div>

    
    
  )
}


export default Auth