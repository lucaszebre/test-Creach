"use client"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { resultType } from "@/types"
import { format } from 'date-fns';

import DialogQuizz from "./DialogQuizz"

export  function History() {
  
  let supabase = createClient()

  const currentUser =useQuery({
    queryFn: async () => {
      const supabase = createClient()
      const { data} = await supabase.auth.getUser()

      return data
    },
    queryKey: ['user'],
    enabled:true
  })
  


  const {
    isFetching,
    data,
    isLoading
  } = useQuery({
    queryFn: async () => {
      
  let { data: Result, error } = await supabase
  .from('Result')
  .select('*,Quizz(*)').eq('user_id',currentUser.data?.user?.id);

      return Result as unknown as resultType[];
    },
    queryKey: ['result'],
    enabled:true
  })


  if(isLoading){
    return(
      <p>Loading...</p>
    )
  }

  console.log(data)


    return (
    <>
    <main className="flex-1 py-8 px-6 w-full h-full">
        <section>
          <h2 className="text-xl font-bold mb-4">Quiz History</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Quiz</th>
                  <th className="py-2 px-4 text-left">Score</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                 
                  {data?.map((r)=>{
                    return (
                      <>
                      <tr className="border-b hover:bg-gray-100 cursor-pointer">
                        <td className="py-2 px-4">
                        <DialogQuizz history={r}>

                        <button className="text-blue-500 hover:underline">{r.Quizz?.title}</button>
                        </DialogQuizz>

                      </td>
                      <td className="py-2 px-4">{`${r.score} / ${r.Quizz?.questions.length}`}</td>
                      <td className="py-2 px-4">{format(r.time, 'yyyy-MM-dd HH:mm:ss')}</td>
                      </tr>
                   

                      </>

                    )
                  })}
                  
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
    </>
  )
}
