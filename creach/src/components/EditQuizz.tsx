/* eslint-disable react/jsx-no-undef */
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { editQuizzSchema, newEditQuizzType, newQuizzSchema, newQuizzType, questionTemplate, questionType, questionType2, quizSchema, quizzType } from "@/types"
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

export default function EditQuizz(props:{edit:quizzType}) {
  const [isLoading,setIsLoading] = useState(false)
  const queryClient = new QueryClient()
  
 
  const questions: questionType2[] = props.edit.questions.map((template: questionType) => ({
    title: template.title || "",
    value: template.value || "",
    inputType: template.inputType,
    description: template.description,
    possibilities1: template.possibilities ? template.possibilities[0] || "" : "",
    possibilities2: template.possibilities ? template.possibilities[1] || "" : "",
    correctAnswer: template.correctAnswer || "",
  }));
  

  const newValue = {
    id:props.edit.id,
    title:props.edit.title,
    description:props.edit.description,
    questions:questions
  }
  
  console.log(newValue)

  const defaultValues: Partial<newEditQuizzType> = newValue;

  const form = useForm<z.infer<typeof editQuizzSchema>>({
      resolver: zodResolver(editQuizzSchema),
      defaultValues,
      mode:'onChange'
    })
   

  console.log("error",form.formState.errors)

  const { fields, append,remove } = useFieldArray({
    name: "questions",
    control: form.control,
  })
  


  async function  onSubmit(values: z.infer<typeof editQuizzSchema>) {
    setIsLoading(true)
    
    console.log("newquizz",values);
     const data = await axios.put('/api/quizz',values)  
     if(!data){
       toast.error('Error to update a quizz');
     }else{
       toast.success('Update the quizz');
     }

    queryClient.refetchQueries({ queryKey: [`quizz`] }) // refect the quizz to get the last update quizz
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
                <Input   placeholder="title quizz" {...field} />
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
            <Card className="p-10" key={field.id}>
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
          

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full bg-red-600 text-white"
            onClick={() => remove(-1)} // delete the last question 
          >
            Remove Question
          </Button>
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
            )}Save Quizz</Button>
      </form>
    </Form>
    </div>
  )
}