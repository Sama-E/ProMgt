import React from 'react'
import Navbar from './(components)/Navbar'
import Sidebar from './(components)/Sidebar'

const DashboardWrapper = ({ children }: {children:React.ReactNode}) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
        {/* SIDEBAR */}
        <Sidebar />
        {/* MAIN */}
        <main className={`flex w-full flex-col bg-gray-50 md:pl-64`}>
            {/* NAVBAR */}
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default DashboardWrapper