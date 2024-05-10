/* eslint-disable react/jsx-no-undef */
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SchemaLogin, getQuestionsSchema, newQuizzSchema, questionTemplate } from "@/types"
import { supabase } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient } from "@tanstack/query-core"

import react, { useState } from "react"
import { useFieldArray, useForm} from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { Icons } from "./icons"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"
import axios from "axios"
import { Card } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function NewQuizz() {
  const [isLoading,setIsLoading] = useState(false)
  const queryClient = new QueryClient()
  

  const form = useForm<z.infer<typeof newQuizzSchema>>({
    resolver: zodResolver(newQuizzSchema),
    defaultValues: {
      title:"",
      description:"",
      questions:[{
        title:"u",
        description:"",
        value:"",
        inputType: "string",
        possibilities1:"haha",
        possibilities2:"haha",
        correctAnswer:''
      }]
      
    },
    mode:'onChange'
  })

  console.log("error",form.formState.errors)

  const { fields, append,remove } = useFieldArray({
    name: "questions",
    control: form.control,
  })


  async function  onSubmit(values: z.infer<typeof newQuizzSchema>) {
    setIsLoading(true)
    
     const data = await axios.post('/api/quizz',values)  
     if(!data){
       toast.error('Error to create a quizz');
     }else{
       toast.success('new quizz');
     }

    queryClient.invalidateQueries({ queryKey: [`quizz`] }) // refect the quizz to get the last one
    queryClient.refetchQueries({ queryKey: [`quizz`] }) // refect the quizz to get the last one
    setIsLoading(false)
     

}

  return (
    <div className="w-full ">
      
      <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Quizz Title</FormLabel>
              <FormControl>
                <Input placeholder="title quizz" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-start items-start w-full" >Quizz Description</FormLabel>
              <FormControl>
                <Input  placeholder="10" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 


     

{fields.map((field, index) => (
            <Card className="p-10 relative" key={field.id}>
<svg onClick={() => remove(index)}  className="absolute cursor-pointer top-5 right-5" width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM4.50003 7C4.22389 7 4.00003 7.22386 4.00003 7.5C4.00003 7.77614 4.22389 8 4.50003 8H10.5C10.7762 8 11 7.77614 11 7.5C11 7.22386 10.7762 7 10.5 7H4.50003Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

            <FormField
              control={form.control}
              
              name={`questions.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Title Question
                  </FormLabel>
                
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            <FormField
              control={form.control}
              name={`questions.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Title Description
                  </FormLabel>
                
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
            
            <FormField
              control={form.control}
              name={`questions.${index}.inputType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Input type
                  </FormLabel>
                
                  <FormControl>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={"string"} />
                    </SelectTrigger>
                    <SelectContent>
                      
                        <SelectItem  value={'string'}>string</SelectItem>
                        <SelectItem  value={'number'}>number</SelectItem>
                        <SelectItem  value={'radio'}>radio</SelectItem>
                        <SelectItem  value={'rating'}>rating</SelectItem>
                        <SelectItem  value={'textarea'}>textarea</SelectItem>
                        <SelectItem  value={'select'}>select</SelectItem>
                      
                    </SelectContent>
                  </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
             <FormField
              control={form.control}
              name={`questions.${index}.possibilities1`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Option1
                  </FormLabel>
                
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
            <FormField
              control={form.control}
              name={`questions.${index}.possibilities2`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Option 2
                  </FormLabel>
                
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            
            
            <FormField
              control={form.control}
              name={`questions.${index}.correctAnswer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Correct Answer
                  </FormLabel>
                
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </Card>
          
                    

          ))}
          

          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full bg-red-600 text-white"
            onClick={() => remove(-1)} // delete the last question 
          >
            Remove Question
          </Button> */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full bg-green-600 text-white"
            onClick={() => append(questionTemplate)}
          >
            Add Question
          </Button>

        <Button  type="submit" className="w-full">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Create Quizz</Button>
      </form>
    </Form>
    </div>
  )
}