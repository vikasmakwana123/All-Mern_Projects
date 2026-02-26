import React from "react";

const ProjectsSection = () => {
  const openProject = () => {
    window.open("https://gamessonnet.netlify.app/", "_blank");
  };

  return (
    <div
      id="projects"
      className="w-full py-20 bg-gradient-to-r from-violet-600 via-violet-800 to-violet-900 text-amber-100 px-6 flex justify-center"
    >
      <div className="max-w-5xl w-full text-center">

        <h2 className="text-4xl mx-auto w-fit font-bold mb-10">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE — RESPONSIVE DESKTOP BROWSER MOCKUP */}
          <div className="hidden md:flex justify-center order-2 md:order-1">
            <div
              className="
                w-full 
                max-w-[350px]       /* Mobile width */
                h-[220px]           /* Mobile height */
                md:max-w-[650px]    /* Desktop width */
                md:h-[380px]        /* Desktop height */
                bg-gray-900 rounded-xl 
                border-[6px] border-gray-700 
                overflow-hidden shadow-2xl
              "
            >
              {/* Browser Top Bar */}
              <div className="bg-gray-800 h-8 md:h-10 flex items-center gap-2 px-4">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                <div
                  className="
                    ml-4 
                    bg-gray-700 text-gray-300 
                    px-2 py-0.5 
                    md:px-3 md:py-1 
                    rounded-md 
                    text-[10px] md:text-sm 
                    w-full truncate
                  "
                >
                  https://gamessonnet.netlify.app/
                </div>
              </div>

              {/* Website Iframe Preview */}
              <iframe
                src="https://gamessonnet.netlify.app/"
                title="GameSonnet Preview"
                className="
                  w-full 
                  h-[calc(100%-32px)]   /* Mobile height calc */
                  md:h-[calc(100%-40px)] /* Desktop calc */
                "
              ></iframe>
            </div>
          </div>

          {/* RIGHT SIDE — DESCRIPTION */}
          <div
            onClick={openProject}
            className="
              cursor-pointer 
              bg-violet-800 
              p-6 rounded-2xl 
              shadow-lg 
              hover:scale-105 
              hover:shadow-2xl 
              transition-all 
              duration-300 
              order-1 md:order-2
            "
          >
            <h3 className="text-2xl font-semibold mb-2">
              Game Suggestion Platform
            </h3>

            <p className="text-sm mb-4">
              A community-driven platform where gamers can suggest, review, and 
              discover new games from multiple platforms. Includes rating system, 
              AI-based recommendations, and centralized game discovery.
            </p>

            <p className="text-sm mb-4">
              <span className="font-semibold">Tech Stack:</span> React, MongoDB, 
              TailwindCSS, Node.js
            </p>

            <button
              className="mt-2 w-full bg-amber-500 text-black py-2 rounded-xl font-semibold hover:bg-amber-400"
            >
              Visit Website
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectsSection;
