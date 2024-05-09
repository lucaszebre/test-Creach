/* eslint-disable react/jsx-no-undef */

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import react from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function DialogDelete(props:{children:react.ReactNode,id:string,title:string}) {

    const queryClient = useQueryClient()

    const config = {
        data: {
          id: props.id
        }
      }
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const  data = await axios.delete('/api/quizz',config)
           
        },

        onError: () => {
            toast.error(`Error to delete quizz`);

        },
        
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: [`quizz`] })
            toast.success('Quizz delete sucessfully');

        }
        
        
    })
  return (
    <AlertDialog defaultClose>
      <AlertDialogTrigger asChild>
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete Quiz `}</AlertDialogTitle>
          <AlertDialogDescription>{`Are you sure you want to delete this quiz? "${props.title}"`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>{deleteMutation.mutateAsync()}}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}