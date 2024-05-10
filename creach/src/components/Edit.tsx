"use client"

import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { quizzType, resultType } from "@/types"
import DialogQuizz from "./DialogQuizz"
import DialogDelete from "./DialogDelete"

export  function Edit() {
  
  const supabase = createClient();




  const {
    isFetching,
    data,
    isLoading
  } = useQuery({
    queryFn: async () => {
      
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
    <>
    <main className="flex-1 py-8 px-6 w-full h-full">
        <section>
          <h2 className="text-xl font-bold mb-4">Quizz List</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200 w-full">
                <tr>
                  <th className="py-2 px-4 text-left">Quizz</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                 
                  {data?.map((quizz)=>{
                    return (
                      <>
                      <tr className="border-b hover:bg-gray-100 cursor-pointer">
                        <td className="py-2 px-4">

                        <button className="text-blue-500 dg:text-base text-xs hover:underline">{quizz?.title}</button>

                      </td>
                      <td className="flex flex-row justify-between w-full items-center px-5">
                      <DialogQuizz edit={quizz}>

                        <span className="hover:underline dg:text-base text-xs cursor-pointer">Edit</span>
                      </DialogQuizz>
                      <DialogDelete id={quizz.id ? quizz.id:""} title={quizz.title ? quizz.title : ""}>
                      <span className="hover:underline dg:text-base text-xs cursor-pointer">Delete</span>

                      </DialogDelete>
                      </td>
                      
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