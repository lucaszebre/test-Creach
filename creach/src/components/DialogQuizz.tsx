"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import NewForm from './NewQuizz';
import Quizz from './Quizz';
import HistoryQuizz from './HistoryQuizz';

interface Props{
  children:React.ReactNode;
  quizz?:any;
  history?:any;
  edit?:any;
}
export default function DialogQuizz(props:Props) { 
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className='w-full h-full' onClick={openModal} >
        {props.children} 
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" h-[80%] w-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                
                  <div className="mt-2">
                    {props.history && <HistoryQuizz quizz={props.history} /> }
                    {props.quizz && <Quizz quizz={props.quizz} />} 
                    {props.edit && <Quizz quizz={props.edit} />} 
                    
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}