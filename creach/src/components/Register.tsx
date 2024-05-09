"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SchemaRegister } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "./icons"
import React, {  useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"


 function Register() {
    const [isLoading,setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof SchemaRegister>>({
        resolver: zodResolver(SchemaRegister),
        defaultValues: {
          email: "",
          password:"",
                    
        },
      })


      
      async function onSubmit(values: z.infer<typeof SchemaRegister>) {
        try {
            setIsLoading(true);
           
            // Attempt to register the user
            const response = await axios.post('/api/account',{
                name:values.name,
                email:values.email,
                password:values.password
            })
    
            // If registration is successful
            if (response.status==200) {
                toast.success("Register successfully");
                
            }
    
        } catch (error) {
           
              toast.error('Registration failed');
            
        } finally {
            setIsLoading(false);
        }
    }
  return (
            
            <Card className="p-5">
                      <Toaster />

                <div className="flex flex-row content-center justify-center  w-full items-center">
                    <div>
                    <h1>QUIZZONDEMAND</h1>
                    </div>
                </div>        
            <CardHeader className="space-y-1">
            <CardTitle className="text-2xl ">Register an account</CardTitle>
            <CardDescription >
            Enter your email below to register your account
            </CardDescription>
        </CardHeader>
        <Form {...form} >
        <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className="flex-col items-start content-start w-full">
                <FormLabel className="text-start w-full" >Name</FormLabel>
                <FormControl>
                    <Input placeholder="lucas" {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />   <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className="flex-col items-start content-start w-full">
                <FormLabel className="text-start w-full" >Email</FormLabel>
                <FormControl>
                    <Input  placeholder="lucas1@gmail.com" {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            /> 
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel className="text-start items-start w-full" >Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="shadcn@dd11" {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className="w-full"> {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Register</Button>
        </form>
        </Form>
       
        </Card>
        
        
    )
}


export default Register