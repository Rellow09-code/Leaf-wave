import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Leaves Pattern */}
      <div className="absolute inset-0 bg-[url('/leaf-pattern.png')] opacity-10"></div>

      {/* Navbar */}
      <nav className="w-full bg-green-600 flex items-center justify-between px-6 py-3 shadow-md relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-600 font-bold">🌿</span>
          </div>
          <span className="text-white font-semibold text-lg">LeafChat</span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-lg outline-none text-sm w-1/3"
        />
        <div className="flex items-center space-x-4 text-white">
          <span className="cursor-pointer">🔔</span>
          <span className="cursor-pointer">👤</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 relative z-10 mt-20">
        {/* Leaf Chat Bubble */}
        <div className="bg-green-500 p-10 rounded-3xl relative text-white">
          <div className="flex space-x-8">
            <div className="w-20 h-20 bg-green-700 rounded-full"></div>
            <div className="w-20 h-20 bg-green-700 rounded-full"></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mt-8">
          Chatting with Nature
        </h1>
        <p className="text-green-600 mt-4 max-w-lg">
          Connect with friends in a calming, nature-inspired space. Conversations
          that feel as fresh as the forest.
        </p>

        {/* CTA Button */}
        <button className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-green-700 transition">
          Sign Up
        </button>
      </main>
    </div>
  );
}
