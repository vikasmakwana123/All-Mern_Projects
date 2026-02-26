import { useEffect, useState } from "react";

const Header = () => {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  // Track active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full sticky top-0 bg-violet-900 text-white shadow-md z-50">
      {/* Main container for flex layout */}
      <div className="md:flex md:justify-between md:items-center p-5">
        
        {/* Top bar (Logo + Mobile Hamburger) */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="text-2xl font-bold">Vikas Makwana</h1>

          {/* Hamburger button (mobile only) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul
          className={`md:flex md:space-x-6 md:items-center bg-violet-900 md:bg-transparent w-full md:w-auto transition-all duration-300 ease-in-out 
            ${isOpen ? "block" : "hidden"}`}
        >
          {["home", "about", "projects", "contact"].map((id) => (
            <li key={id} className="text-center md:text-left py-2 md:py-0">
              <a
                href={`#${id}`}
                className={`block px-4 ${
                  active === id
                    ? "text-yellow-300 font-bold"
                    : "hover:text-yellow-300"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;