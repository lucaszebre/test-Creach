import prisma from "@/lib/db";
import {  configSchema, editQuizzSchema, newQuizzSchema } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { v4 as uuidv4 } from 'uuid';


export const runtime = "nodejs";
export const maxDuration = 500;

export async function POST(req: Request, res: Response) {
  try {
    const supabase = createClient()
    const user = supabase.auth.getUser()
    if(!user){
        return NextResponse.json(
            { error: "Need to be login" },
            {
              status: 400,
            }
          );
    }
  
    const body = await req.json();
    const newQuizz = newQuizzSchema.parse(body);


    // need to recreate the json to fit , so we can the quizz nicely
    const mappedQuestions = newQuizz.questions.map(question => ({
      title: question.title,
      value: question.value ?? "",
      inputType: question.inputType,
      description: question.description,
      correctAnswer: question.correctAnswer,
      possibilities: [question.possibilities1, question.possibilities2,question.correctAnswer],
    }));

     

      const { data, error } = await supabase
      .from('Quizz')
      .insert([
        { id:uuidv4(),title: newQuizz.title, description: newQuizz.description , questions:mappedQuestions },
      ])
      .select();
    
        
       if(error){
         return NextResponse.json(
          { error: error},
           {
             status: 400,
           }
         );
     }

   

    
     return NextResponse.json(
       {
         data: data,
      },
       {
         status: 200,
       }
     );
  } catch (error) {
      return NextResponse.json(
        { error: error},
        {
          status: 400,
        }
      );
    
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const supabase = createClient()
    const user = supabase.auth.getUser()
    if(!user){
        return NextResponse.json(
            { error: "Need to be login" },
            {
              status: 400,
            }
          );
    }
  
    const body = await req.json();


    const config = configSchema.parse(body);



     

    
      const { data,error } = await supabase
      .from('Quizz')
      .delete()
      .eq('id', config.id)
        
        
      console.log(data)
      console.log(error)
       if(error){
         return NextResponse.json(
          { error: error},
           {
             status: 400,
           }
         );
     }

   

    
     return NextResponse.json(
       {
         data: data,
      },
       {
         status: 200,
       }
     );
  } catch (error) {
      return NextResponse.json(
        { error: error},
        {
          status: 400,
        }
      );
    
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const supabase = createClient()
    const user = supabase.auth.getUser()
    if(!user){
        return NextResponse.json(
            { error: "Need to be login" },
            {
              status: 400,
            }
          );
    }
  
    const body = await req.json();

    console.log(body)
    const newQuizz = editQuizzSchema.parse(body);


    // need to recreate the json to fit the model , so we can the quizz can display nicely later
    const mappedQuestions = newQuizz.questions.map(question => ({
      title: question.title,
      value: question.value ?? "",
      inputType: question.inputType,
      description: question.description,
      correctAnswer: question.correctAnswer,
      possibilities: [question.possibilities1, question.possibilities2,question.correctAnswer],
    }));

     

              
        const { data, error } = await supabase
        .from('Quizz')
        .update({ title: newQuizz.title, description: newQuizz.description , questions:mappedQuestions })
        .eq('id', newQuizz.id)
        .select()
        
    
        console.log(error);
        console.log(data);
       if(error){
         return NextResponse.json(
          { error: error},
           {
             status: 400,
           }
         );
     }

   

    
     return NextResponse.json(
       {
         data: data,
      },
       {
         status: 200,
       }
     );
  } catch (error) {
      return NextResponse.json(
        { error: error},
        {
          status: 400,
        }
      );
    
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const supabase = createClient()
    const user = supabase.auth.getUser()
    if(!user){
        return NextResponse.json(
            { error: "Need to be login" },
            {
              status: 400,
            }
          );
    }
  
    const quizzs = await prisma.quizz.findMany({
      include:{results:true}})
    return NextResponse.json(
      {
        quizzs: quizzs,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    
    
  }
  }}