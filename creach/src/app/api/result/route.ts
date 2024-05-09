/* eslint-disable react-hooks/rules-of-hooks */
import prisma from "@/lib/db";
import { getQuestionsSchema, quizSchema } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import React from "react";
import { ZodError } from "zod";


export const runtime = "nodejs";
export const maxDuration = 500;

export async function POST(req: Request, res: Response) {
  try {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const userId = user.data.user?.id;
    if(!user){
        return NextResponse.json(
            { error: "Need to be login" },
            {
              status: 400,
            }
          );
    }
  
    const body = await req.json();

    const quizz = quizSchema.parse(body);
    let score = 0;
    let i = 0;
    for (const question of quizz.questions) {
        i++;
      if (question.value === question.correctAnswer) {
        score++;
      }
    }

    score = score/i;





    try {
        const { data, error } = await supabase
        .from('Result')
        .insert([
            {  score:score , quizz_id:quizz.id , answer:quizz.questions,user_id:userId },
        ])
        .select()
    } catch (error) {
        
            return NextResponse.json(
              { error: error },
              {
                status: 400,
              }
            );
    }

    


  
    
    
    









    return NextResponse.json(
      {
        score,
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
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}