import React from 'react';

const AnimatedVideo = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Bikes */}
        <div className="absolute top-10 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="opacity-20">
            <path d="M10 30C10 25 15 20 20 20C25 20 30 25 30 30C30 35 25 40 20 40C15 40 10 35 10 30Z" fill="white"/>
            <path d="M30 30C30 25 35 20 40 20C45 20 50 25 50 30C50 35 45 40 40 40C35 40 30 35 30 30Z" fill="white"/>
            <path d="M20 25L40 25" stroke="white" strokeWidth="2"/>
            <path d="M25 20L35 20" stroke="white" strokeWidth="2"/>
            <path d="M30 15L30 20" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <svg width="50" height="35" viewBox="0 0 50 35" fill="none" className="opacity-15">
            <path d="M8 25C8 20 12 15 17 15C22 15 26 20 26 25C26 30 22 35 17 35C12 35 8 30 8 25Z" fill="white"/>
            <path d="M26 25C26 20 30 15 35 15C40 15 44 20 44 25C44 30 40 35 35 35C30 35 26 30 26 25Z" fill="white"/>
            <path d="M17 20L35 20" stroke="white" strokeWidth="2"/>
            <path d="M22 15L30 15" stroke="white" strokeWidth="2"/>
            <path d="M26 10L26 15" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <svg width="45" height="30" viewBox="0 0 45 30" fill="none" className="opacity-10">
            <path d="M7 22C7 18 10 14 14 14C18 14 21 18 21 22C21 26 18 30 14 30C10 30 7 26 7 22Z" fill="white"/>
            <path d="M21 22C21 18 24 14 28 14C32 14 35 18 35 22C35 26 32 30 28 30C24 30 21 26 21 22Z" fill="white"/>
            <path d="M14 17L28 17" stroke="white" strokeWidth="2"/>
            <path d="M18 12L24 12" stroke="white" strokeWidth="2"/>
            <path d="M21 7L21 12" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        {/* Animated Road */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-gray-600">
          <div className="flex justify-between items-center h-full px-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-1 bg-white opacity-60 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Animated Clouds */}
        <div className="absolute top-10 left-1/4 animate-pulse" style={{ animationDuration: '4s' }}>
          <div className="w-20 h-8 bg-white rounded-full opacity-30"></div>
        </div>
        
        <div className="absolute top-20 right-1/3 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="w-16 h-6 bg-white rounded-full opacity-25"></div>
        </div>

        <div className="absolute top-15 left-2/3 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>
          <div className="w-12 h-5 bg-white rounded-full opacity-20"></div>
        </div>

        {/* Animated Sun */}
        <div className="absolute top-8 right-8 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="w-16 h-16 bg-yellow-300 rounded-full opacity-80 shadow-lg"></div>
        </div>

        {/* Animated Mountains */}
        <div className="absolute bottom-16 left-0 right-0">
          <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" className="opacity-40">
            <path d="M0 60L50 30L100 60L150 20L200 60L250 35L300 60L350 25L400 60L400 60L0 60Z" fill="white"/>
          </svg>
        </div>

        {/* Animated Trees */}
        <div className="absolute bottom-16 left-10">
          <div className="w-4 h-8 bg-green-800 rounded-t-full opacity-60 animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
        
        <div className="absolute bottom-16 right-20">
          <div className="w-3 h-6 bg-green-800 rounded-t-full opacity-50 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        </div>

        <div className="absolute bottom-16 left-1/3">
          <div className="w-5 h-10 bg-green-800 rounded-t-full opacity-70 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Central Animated Bike */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Main Bike */}
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="animate-bounce" style={{ animationDuration: '2s' }}>
            {/* Front Wheel */}
            <circle cx="30" cy="60" r="15" fill="white" opacity="0.9"/>
            <circle cx="30" cy="60" r="12" fill="none" stroke="gray" strokeWidth="2"/>
            <circle cx="30" cy="60" r="8" fill="none" stroke="gray" strokeWidth="1"/>
            
            {/* Back Wheel */}
            <circle cx="90" cy="60" r="15" fill="white" opacity="0.9"/>
            <circle cx="90" cy="60" r="12" fill="none" stroke="gray" strokeWidth="2"/>
            <circle cx="90" cy="60" r="8" fill="none" stroke="gray" strokeWidth="1"/>
            
            {/* Frame */}
            <path d="M30 45L60 25L90 45" stroke="white" strokeWidth="3" fill="none"/>
            <path d="M60 25L60 45" stroke="white" strokeWidth="3" fill="none"/>
            
            {/* Seat */}
            <ellipse cx="60" cy="25" rx="8" ry="3" fill="white" opacity="0.8"/>
            
            {/* Handlebar */}
            <path d="M30 45L25 40" stroke="white" strokeWidth="3" fill="none"/>
            <path d="M25 35L25 45" stroke="white" strokeWidth="2" fill="none"/>
            
            {/* Pedals */}
            <path d="M60 45L65 45" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M60 45L55 45" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
          
          {/* Spinning Wheels */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-12 left-15 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
            <div className="absolute top-12 right-15 w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Animated Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <h3 className="text-white text-xl font-bold animate-pulse" style={{ animationDuration: '3s' }}>
          Welcome to Bike Store
        </h3>
        <p className="text-white text-sm opacity-80 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          Your journey starts here
        </p>
      </div>
    </div>
  );
};

export default AnimatedVideo; 