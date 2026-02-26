import React from 'react'
import heroImage from '../assets/1223.jpeg'
import resumeIcon from '../assets/resume.svg'

const Hero_section = () => {
    return (
        <div id='home' className="w-full md:h-[70vh] h-[68vh] bg-gradient-to-r from-violet-600 via-violet-800 to-violet-900 relative flex justify-center items-center p-5">
            
            {/* Main content */}
            <div className="flex flex-wrap gap-10 justify-center items-center">
                <img
                    src={heroImage}
                    className="md:w-[300px] md:h-[300px] w-[200px] h-[200px] object-cover rounded-full overflow-hidden"
                    alt="hero"
                />
                <h1 className="font-bold text-4xl md:text-5xl text-amber-100 p-8 rounded-2xl">
                    Hi, I’m Vikas — Web Developer & CS Student.
                </h1>
            </div>

            {/* Download Resume button fixed to top-right of hero */}
            <div className="absolute top-4 right-4">
                <a
                    href="/Vikas_Makwana_CV.pdf"
                    download
                    className="flex items-center bg-violet-900 text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700 transition"
                >
                    Download Resume 
                    <img src={resumeIcon} alt="download" className="invert w-6 h-6 ml-2"/>
                </a>
            </div>
        </div>
    )
}

export default Hero_section
