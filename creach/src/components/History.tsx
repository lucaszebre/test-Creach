"use client"
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { resultType } from "@/types"
import { DatabaseZap } from "lucide-react"
import DialogQuizz from "./DialogQuizz"

export  function History() {
  
  const supabase = createClient();




  const {
    isFetching,
    data,
    isLoading
  } = useQuery({
    queryFn: async () => {
      
  let { data: Result, error } = await supabase
  .from('Result')
  .select('*,Quizz(*)');

      return Result as unknown as resultType[];
    },
    queryKey: ['result'],
    enabled:true
  })



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
                      <td className="py-2 px-4">{r.score}</td>
                      <td className="py-2 px-4">{r.time}</td>
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
