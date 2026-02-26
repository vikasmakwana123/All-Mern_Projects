import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
    id="contact"
      className="
        w-full 
        bg-gradient-to-r from-violet-600 via-violet-800 to-violet-900
        text-amber-100 
        py-10 px-6 
        flex justify-center

      "
    >
      <div className="max-w-5xl w-full text-center">

        {/* FOOTER TITLE */}
        <h2 className="text-3xl font-bold mb-6 w-fit mx-auto">
          Connect With Me
        </h2>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-8 mb-8">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vikas-makwana-0642422b1/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex flex-col items-center gap-2 
              bg-violet-800 
              p-4 rounded-2xl shadow-lg
              hover:scale-110 hover:shadow-2xl 
              transition-all duration-300
            "
          >
            <FaLinkedin className="text-4xl text-amber-100" />
            <span className="text-sm font-semibold">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/vikasmakwana123"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex flex-col items-center gap-2 
              bg-violet-800 
              p-4 rounded-2xl shadow-lg
              hover:scale-110 hover:shadow-2xl 
              transition-all duration-300
            "
          >
            <FaGithub className="text-4xl text-amber-100" />
            <span className="text-sm font-semibold">GitHub</span>
          </a>

          {/* Email */}
          <a
            href="mailto:vikasmakwana55555@gmail.com"
            className="
              flex flex-col items-center gap-2 
              bg-violet-800 
              p-4 rounded-2xl shadow-lg
              hover:scale-110 hover:shadow-2xl 
              transition-all duration-300
            "
          >
            <FaEnvelope className="text-4xl text-amber-100" />
            <span className="text-sm font-semibold">Email</span>
          </a>

        </div>

        {/* COPYRIGHT */}
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Vikas Makwana — All Rights Reserved
        </p>

      </div>
    </footer>
  );
};

export default Footer;
