/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
"use client"
import { SchemaRegister, quizzType , quizSchema, questionType} from '@/types'
import React, { useState } from 'react'
import {  useFieldArray, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Icons } from './icons'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Form,FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { z } from 'zod'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import RenderInputComponent from './RenderInput'


const Quizz = (props:{quizz:quizzType}) => {
  const [isLoading,setIsLoading] = useState(false)
  const [score,setScore] = useState<string>("")
  type QuizzFormValues = z.infer<typeof quizSchema>

  const defaultValues: Partial<QuizzFormValues> = props.quizz;

  const form = useForm<z.infer<typeof quizSchema>>({
      resolver: zodResolver(quizSchema),
      defaultValues,
      mode:'onChange'
    })
    const { fields, append } = useFieldArray({
      name: "questions",
      control: form.control,
    })



    
    async function onSubmit(values: z.infer<typeof quizSchema>) {
      try {
          setIsLoading(true);


          // // Attempt to post the result 
            const response = await axios.post('/api/result/',values)
  
          // // If  is successful
           if (response.status==200) {
               toast.success("Quizz submit");
              
           }
           setScore(response.data.score)
  
      } catch (error) {
              toast.error('Error in the quizz submission');

      } finally {
          setIsLoading(false);
      }
  }
  return (
    <>
      {!score ? (
        <Card className="p-5">
          <Toaster />
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{props.quizz.title}</CardTitle>
            <CardDescription className="text-xl font-bold text-center">
              {props.quizz.description}
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
              <div className='flex flex-col gap-8 '>
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`questions.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn('font-bold text-2XL')}>
                          {props.quizz.questions[index].title}
                        </FormLabel>
                        <FormDescription className={cn('font-thin text-XL')}>
                          {props.quizz.questions[index].description}
                        </FormDescription>
                        <div className='flex flex-row justify-between w-full'>
                          {props.quizz.questions[index].inputType !== 'rating' && props.quizz.questions[index].inputType !== 'radio' && props.quizz.questions[index].inputType !== 'select' && props.quizz.questions[index]?.possibilities && props.quizz.questions[index]?.possibilities?.map((p) => (
                            <span className='p-2 underline' key={p}>
                              {p}
                            </span>
                          ))}
                        </div>
                        <FormControl>
                          {RenderInputComponent(props.quizz.questions[index]?.inputType, field, props.quizz.questions[index]?.possibilities)}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="submit" className="w-full">
                {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
                Validate
              </Button>
            </form>
          </Form>
        </Card>
      ) : (
        <p className='text-4xl font-bold'>Ton score est de {score} / {props.quizz.questions.length}</p>
      )}
    </>
  );
}


export default Quizz
