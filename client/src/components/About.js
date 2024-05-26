import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">About Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          We are <span className="font-semibold text-blue-600">SVECW Career Connect</span>, dedicated to helping you navigate your career journey. Our platform offers insights on interviews, assessments, and job offers. Learn from the experiences of your peers and seniors at SVECW.
        </p>
        <hr className="border-gray-300 mb-8" />
        <h3 className="text-2xl font-semibold mb-4 text-center text-blue-500">New Features Ahead</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          We are working to improve our platform and will be adding new features in the future. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default About;
