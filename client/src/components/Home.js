import React from 'react';
import { Link } from 'react-router-dom';
import CreativeTeamGIF from '../Assets/CreativeTeam.gif'; // Adjust the path based on your folder structure

const Home = ({ blogs, handleInputChange, query }) => {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-2 md:ml-4 lg:ml-8"> {/* Increased margin for larger screens */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
            Welcome to <span className="text-blue-500">SVECW Career Connect</span>
          </h1>
          <br></br>
          <p className="text-sm md:text-base lg:text-lg mb-4 leading-relaxed tracking-normal text-gray-700">
            Your hub for sharing and discovering insights on{' '}
            <span className="text-indigo-700">interviews</span>,{' '}
            <span className="text-green-700">assessments</span>, and{' '}
            <span className="text-red-700">job offers</span>.
            Learn from your peers and seniors, and navigate your career journey with firsthand experiences from{' '}
            <span className="text-purple-700">SVECW students</span>.
          </p>
          <p className="text-sm md:text-base lg:text-lg mb-2 leading-relaxed tracking-normal text-gray-700">
            Search blogs by Company | Job Type (Internship, Full Time) | Year
          </p>
          <br></br>
          <div className="flex justify-center mb-2 md:mb-4">
            <div className="relative w-full md:w-5/6 lg:w-3/4 xl:w-2/3 flex">
              <input
                className="flex-grow bg-gray-200 text-gray-800 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                onChange={(e) => handleInputChange(e.target.value)}
                value={query}
              />
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.5-3.65A7.5 7.5 0 1112 4.5a7.5 7.5 0 016.15 13.65z"
                  ></path>
                </svg>
                <span className="ml-2">Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div
            className="w-full max-w-md rounded-lg"
            style={{
              backgroundImage: `url(${CreativeTeamGIF})`,
              backgroundPosition: 'center', // Adjust this according to your needs
              backgroundSize: 'cover', // Adjust this according to your needs
              paddingTop: '56.25%', // 16:9 aspect ratio (height:width)
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">Latest Blogs</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <li key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
              <Link to={`/blog/${blog._id}`} className="block">
                <div className="p-4">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                    <span className="text-red-500 hover:bg-red-600">{blog.title || 'Untitled'}</span>
                  </h3>
                  <h4 className="text-sm text-gray-600 mb-2 shadow-md rounded-lg p-2 bg-gray-100">
                    <span className="text-gray-700">Date: </span>{new Date(blog.createdAt).toLocaleDateString()}
                  </h4>
                  <p className="text-sm text-gray-700">{blog.summary}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:bg-pink-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    
      {/* Footer */}
      <footer className="border-t border-gray-300 py-8 mt-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <p className="text-lg">SVECW Career Connect</p>
          </div>
          <div>
            <p className="text-lg">Made with <span role="img" aria-label="Love">❤️</span> </p>
          </div>
        </div>
      </footer>
{/* End of Footer */}


  
    </div>
  );
};

export default Home;
