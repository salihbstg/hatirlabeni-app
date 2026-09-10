import React from "react";

import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F4F1E8] p-6">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Hero */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-72 rounded-3xl bg-[#B58B72] lg:col-span-2" />
            <div className="h-72 rounded-3xl bg-[#D4A373]" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="h-48 rounded-2xl bg-[#8FA89B]" />
            <div className="h-48 rounded-2xl bg-[#C89F65]" />
            <div className="h-48 rounded-2xl bg-[#91A8A8]" />
          </div>

          {/* Large Section */}
          <div className="h-80 rounded-3xl bg-[#756B61]" />

          {/* Bottom */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-56 rounded-2xl bg-[#D6C29E]" />
            <div className="h-56 rounded-2xl bg-[#A87863]" />
          </div>

        </div>
      </div>
    </>
  );
};

export default HomePage;