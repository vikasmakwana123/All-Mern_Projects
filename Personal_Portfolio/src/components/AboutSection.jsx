import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutSection = () => {

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div id="about">
    <div
      
      className="w-full pt-16 py-16 bg-gradient-to-r from-violet-600 via-violet-800 to-violet-900 text-amber-100 flex justify-center px-6"
    >
      <div className="max-w-4xl text-center">

        <h2 className="text-4xl font-bold mb-6">About Me</h2>

        <p className="text-lg leading-relaxed mb-10">
          I am <span className="font-semibold">Vikas Makwana</span>, a Computer Science
          student with a passion for web development and modern JavaScript
          technologies. I enjoy building clean, functional, and user-focused web
          applications. With Experience in React, Node.js, and Express,
          I aim to learn and continuously improve my technical skills. My goal is
          to grow as a full-stack developer and work in an environment that encourages
          innovation and professional growth.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">

          {/* EXPERIENCE */}
          <div
            className="p-6 rounded-xl shadow-lg"
            data-aos="fade-left"
          >
            <h3 className="text-xl font-semibold text-amber-100 mb-2">
              Experience / Projects
            </h3>
            <p className="text-sm">
              • Developed a community-driven game suggestion platform with reviews,
              recommendations, and centralized game discovery features.
            </p>
          </div>

          {/* EDUCATION */}
          <div
            className="p-6 text-amber-100 rounded-xl shadow-lg"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-sm">
              • B.Sc (Computer Science), RD & SH National College  
              • HSC: 59.90% • SSC: 74.40%
            </p>
          </div>

          {/* INTERESTS */}
          <div
            className="p-6 text-amber-100 rounded-xl shadow-lg"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-semibold mb-2">Interests</h3>
            <p className="text-sm">
              • Web Development  
              • Real-world applications  
              • Learning new technologies  
            </p>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutSection;
