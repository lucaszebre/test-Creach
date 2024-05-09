/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
"use client"
import {  historyType} from '@/types'
import React from 'react'


const HistoryQuizz = (props:{quizz:historyType}) => {
    
  return (
    <>
      <main className="w-full max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Quiz Results</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {`You just completed the "${props.quizz.Quizz?.title}" quiz. Let's see how you did!`}
          </p>
        </div>
        <div className="space-y-6">
        <div className="grid gap-4">

        {props.quizz.Quizz?.questions?.map((question,index)=>{
            return (
            <div className="bg-white rounded-lg border border-gray-200 p-4 dark:bg-gray-950 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="font-medium">{question.title}</div>
                {props.quizz.answer[index].value==question.correctAnswer ? <div className="text-green-500 font-medium">Correct</div>:<div className="text-red-500 font-medium">Incorrect</div>}
                
              </div>
              <div className="mt-2 text-gray-500 dark:text-gray-400">
                <span className="font-medium">Your answer:</span>
                {props.quizz.answer[index].value}{"\n                        "}
              </div>
              <div className="mt-1 text-gray-500 dark:text-gray-400">
                <span className="font-medium">Correct answer:</span>
                {question.correctAnswer}{"\n                        "}
              </div>
            </div>
            )
        })}
        </div>

        <div className='text-4xl font-bold'>
           {`Ton score est de ${props.quizz.score} / ${props.quizz.Quizz?.questions.length}`}
        </div>
          
        </div>
        </div>
    </main>
    </>
  );
}


export default HistoryQuizz
