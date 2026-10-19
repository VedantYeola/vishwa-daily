// import React from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'

// function Hero() {
//   return (
//     <div className='flex flex-col items-center mx-56 gap-9'>
//       <h1 className='font-extrabold text-[50px] text-center mt-16'
//       >
//       <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span><br></br>Personalized Itineraries at your Fingertips</h1>
//       <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curtor,creating custom itineraries tailored to your interests and budget.</p>
//       <Link to={'/create-trip'}>
//         <Button>Get Started, It's Free</Button>
//       </Link>      
//       <video src=''/>
//     </div>
//   )
// }

// export default Hero


import React, { useRef, useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  const videoRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Your video sources
  const videos = [
    '/videostravel1.mp4',
    '/videostravel2.mp4',
    '/videostravel3.mp4',
  ]

  // When currentIndex changes, load and play the new video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentIndex])

  // Move to next video when current ends
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  return (
    <div className='relative w-full h-screen flex items-center justify-center overflow-hidden'>

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        className="absolute w-full h-full object-cover z-0"
      >
        <source src={videos[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className='relative z-10 bg-white/80 backdrop-blur-md p-5 md:p-10 rounded-xl max-w-4xl mx-4 text-center flex flex-col items-center gap-6'>
        <h1 className='font-extrabold text-3xl md:text-[50px] text-center text-[#f56551] leading-tight'>
          Discover Your Next Adventure with AI:
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold">Personalized Itineraries at your Fingertips</h2>
        <p className='text-sm md:text-xl text-gray-600'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to="/create-trip">
          <Button>Get Started, It's Free</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
