/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
"use client"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import  DialogQuizz  from "./DialogQuizz"
import DialogNewQuizz from "./DialogNewQuizz"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { quizzType } from "@/types"

export default function Dashboard() {
  const {
    isFetching,
    data,
    isLoading
  } = useQuery({
    queryFn: async () => {
      
      const supabase = createClient()
      
  let { data: Result, error } = await supabase
  .from('Quizz')
  .select('*');

      return Result as unknown as quizzType[];
    },
    queryKey: ['quizz'],
    enabled:true
  })

  
  if(isLoading){
    return (
      <p>Loading...</p>
    )
  }
  return (
    
      <main className="flex-1 py-8 px-6 h-full">
        <section className="mb-8">
          <div className="flex w-full justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Quizzes</h2>
            <DialogNewQuizz>
            <Button variant="outline">
              <PlusIcon className="w-4 h-4 mr-2" />
                Create a Quizz
            </Button>
            </DialogNewQuizz>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.slice(-4).map((q,key)=>{
              return ( 
              <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{q.title}</h3>
                <p className="text-gray-600 mb-4">{q.description}</p>
                 <DialogQuizz  quizz={q}>
                 <Button>Start Quiz</Button>
                  </DialogQuizz> 
              </div>
            </div>)
            })}
           
            
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">List Quizz</h2>
          <div className="bg-white rounded-lg shadow-md ">
            <table className="w-full h-full relative">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Quiz</th>
                </tr>
              </thead>
              <tbody>
              {data?.map((q,key)=>{
              return ( 
                <tr className="border-b hover:bg-gray-100 cursor-pointer">
                  <DialogQuizz  quizz={q}>
                    <td className="py-2 px-4">{q.title}</td>
                  </DialogQuizz>
              </tr>
            )
            })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
  )
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}