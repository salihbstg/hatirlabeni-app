import React from 'react'
import Navbar from '../components/Navbar/Navbar'
const HomePage = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Hero */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-72 rounded-3xl bg-purple-500 lg:col-span-2" />
          <div className="h-72 rounded-3xl bg-pink-500" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-48 rounded-2xl bg-emerald-500" />
          <div className="h-48 rounded-2xl bg-orange-500" />
          <div className="h-48 rounded-2xl bg-cyan-500" />
        </div>

        {/* Large Section */}
        <div className="h-80 rounded-3xl bg-indigo-500" />

        {/* Bottom */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-56 rounded-2xl bg-yellow-400" />
          <div className="h-56 rounded-2xl bg-red-500" />
        </div>

      </div>
    </div>
    </>
  )
}

export default HomePage
