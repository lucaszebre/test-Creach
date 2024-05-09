import ReactQueryProvider from '@/providers/ReactProvidersQuery';
import '../../globals.css'
import React from 'react'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html  lang="en">
    <head />
    <body>
    <ReactQueryProvider>

      <main>
    {children}
  </main>
  </ReactQueryProvider>

    </body>
  </html>
  )
}

